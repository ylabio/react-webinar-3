import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/content-header";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import ProductDetails from "../../components/product-details";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { menuLinks } from "../lib/const";

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
      <ContentHeader
        onBasketOpen={callbacks.openModalBasket}
        basketAmount={select.amount}
        basketSum={select.sum}
        menuLinks={menuLinks}
      />
      <ProductDetails product={product} onAddToBasket={callbacks.addToBasket} />
    </PageLayout>
  );
};

export default memo(Product);
