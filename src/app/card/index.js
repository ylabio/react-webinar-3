import { memo, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import CardItem from "../../components/card-item";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Card({ item }) {
  const store = useStore();

  console.log(item);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

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

  return (
    <PageLayout>
      <Head title="Название товара" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <CardItem onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Card);
