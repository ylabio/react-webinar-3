import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPage: state.catalog.totalPage,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.actions.catalog.load();
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
    // Перерендер страницы
    changePage: useCallback(
      (page) => {
        store.actions.catalog.load(page);
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  const { currentLanguage } = useLanguage();
  const { shop } = dictionary[currentLanguage];

  return (
    <PageLayout>
      <Head title={shop} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        changePage={callbacks.changePage}
        currentPage={select.currentPage}
        totalPages={select.totalPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
