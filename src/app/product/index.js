import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasketTool from "../../components/basket-tool";
import ContentHeader from "../../components/content-header";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { formatPrice } from "../../utils";
import "./index.css";

const Product = () => {
  const [isLoad, setIsLoad] = useState(true);

  const store = useStore();
  const params = useParams();
  const product = useSelector((s) => s.product.productDetails);
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        store.actions.modals.close();
        setIsLoad(true);
        await store.actions.product.load(params.productId);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoad(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  if (isLoad) return <h1>Loading...</h1>;

  return (
    <PageLayout>
      <Head title={product.title} />
      <ContentHeader>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ContentHeader>
      <div className="Product-content">
        <p>{product.description}</p>
        <p>
          Страна производитель:{" "}
          <strong>{`${product.madeIn.title} (${product.madeIn.code})`}</strong>
        </p>
        <p>
          Категория: <strong>{product.category.title}</strong>
        </p>
        <p>
          Год выпуска: <strong>{product.edition}</strong>
        </p>
        <h2>Цена: {formatPrice(product.price)}</h2>
        <button
          onClick={() => {
            callbacks.addToBasket(product._id);
          }}
        >
          Добавить
        </button>
      </div>
    </PageLayout>
  );
};

export default memo(Product);
