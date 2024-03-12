import { memo, useCallback, useEffect, useState } from 'react'
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.pagination.currentPage,
    language: state.language.value
  }));

  useEffect(() => {
    store.actions.catalog.load(select.currentPage * 10, select.language);
  }, [select.currentPage, select.language]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    changeCurrenPage: useCallback(page => store.actions.pagination.changePage(page), [store]),
    // Смена языка
    changeLanguage: useCallback(lang => store.actions.language.changeLang(lang), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' lang={select.language} changeLang={callbacks.changeLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination countPages={select.count} currentPage={select.currentPage} onChangePage={callbacks.changeCurrenPage} />
    </PageLayout>

  );
}

export default memo(Main);
