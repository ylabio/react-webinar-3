import React, { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import ItemArticle from "../../components/item-article";
import { useLocation } from "react-router-dom";

const Article = () => {
  const store = useStore();
  const location = useLocation();
  const id = location.pathname.replace("/article/", "");

  const select = useSelector((state) => ({
    article: state.article.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const item=select.article;
  useEffect(() => {
    store.actions.article.load(id);
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
    <PageLayout>
      <Head title={item.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemArticle item={item} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
};

export default memo(Article);
