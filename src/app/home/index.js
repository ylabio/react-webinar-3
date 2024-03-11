import React, { useCallback, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Paginator from "../../components/paginator";
import {useLanguage} from "../../LanguageContext";

function Home() {
  const store = useStore();
  const {tr} = useLanguage()

  useEffect(() => {
    store.actions.catalog.load({ page: 1 });
  }, [store.actions.catalog]);

  const select = {
    list: useSelector((state) => state.catalog.list),
    totalPages: useSelector((state) => state.catalog.totalPages),
    currentPage: useSelector((state) => state.catalog.currentPage),
    amount: useSelector((state) => state.basket.amount),
    sum: useSelector((state) => state.basket.sum) // Используем текущую страницу из состояния
  }


  const callbacks = {
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  }

  const handlePageChange = (page) => {
    store.actions.catalog.load({ page });
  };

  const renders = {
    item: useCallback(
      (item) => {
        const link = `/articles/${item._id}`
        return <Item item={item} onAdd={callbacks.addToBasket} customLink={link} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <Head title={tr('store')} />
      <BasketTool sum={select.sum} amount={select.amount} openModal={callbacks.openModalBasket}/>
      <List list={select.list} renderItem={renders.item} />
      <Paginator
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default React.memo(Home);
