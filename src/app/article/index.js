import React, { useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import ItemArticle from "../../components/item-article";
import { useLocation } from "react-router-dom";
import LocaleSwitcher from "../../components/locale-switcher";

const Article = () => {
  const store = useStore();
  const location = useLocation();
  const id = location.pathname.replace("/article/", "");

  const select = useSelector((state) => ({
    article: state.article.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

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
    changeLang: useCallback(
      (e) => store.actions.locale.changeLang(e),
      [select.lang]
    ),
  };

  return (
    <PageLayout>
      <Head title={Object.keys(select.article).length && select.article.title}>
        <LocaleSwitcher changeLang={callbacks.changeLang} lang={select.lang} />
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemArticle item={select.article} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
};

export default Article;
