import React, { memo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import CardItem from "../../components/card-item";

const InfoCard = () => {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    card: state.card.card,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.card.loadingCard(id);
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
  return (
    <div>
      <PageLayout>
        <Head title={select.card.title} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <CardItem card={select.card} onAdd={callbacks.addToBasket}/>
      </PageLayout>
    </div>
  );
};

export default memo(InfoCard);
