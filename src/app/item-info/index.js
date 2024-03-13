import React, { useCallback, useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Navbar from "../../components/navbar";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemCard from "../../components/item-card";
import { useParams } from "react-router-dom";
import fetchData from "../../api/fetch-data";

let resourse;

function ItemInfo() {
  const { itemId } = useParams();

  if (!resourse) {
    resourse = fetchData(
      `/api/v1/articles/${itemId}?fields=*,madeIn(title,code),category(title)`
    );
  }

  const item = resourse.read();

  useEffect(() => {
    return () => {
      resourse = null;
    };
  }, []);

  const store = useStore();

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
      <Head title={item.title} />
      <Navbar navList={[{ name: "Главная", path: "/" }]}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      <ItemCard item={item} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default React.memo(ItemInfo);
