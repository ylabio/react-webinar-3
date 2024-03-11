import { memo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import "./style.css";

function ProductPage() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.product.load(id);
  }, []);

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

  const select = useSelector((state) => ({
    productData: state.product.productData,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  return (
    <PageLayout>
      <Head
        title={
          select.productData.title ? select.productData.title : "Loading..."
        }
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
    </PageLayout>
  );
}

export default memo(ProductPage);
