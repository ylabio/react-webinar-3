import { memo, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Product from "../../components/product/product";

const ItemPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await store.actions.catalog.fetchProduct(id);
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id, store]);

  return (
    <PageLayout>
      {isLoading ? (
        <h1
          style={{
            margin: 0,
            padding: "20px 20px 10px",
            height: "80px",
            background: "#5f5f5",
          }}
        >
          Загрузка...
        </h1>
      ) : (
        <>
          <Head title={product?.result.title} />
          <BasketTool
            onOpen={() => store.actions.modals.open("basket")}
            amount={select.amount}
            sum={select.sum}
          />
          <Product
            product={product?.result}
            addToCart={callbacks.addToBasket}
          />
        </>
      )}
    </PageLayout>
  );
};

export default memo(ItemPage);
