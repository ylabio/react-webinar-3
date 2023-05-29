import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageTool from "../../components/page-tool";
import Pagination from "../../components/pagination";
import {useTranslation} from "../../locales";
import Spinner from "../../components/spinner";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    loading: state.catalog.loading
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeCurrentPage: useCallback((page) => store.actions.catalog.changePage(page), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} href={`articles/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  const { t } = useTranslation();

  return (
    <PageLayout>
      <Head title={t('title')}/>
      <PageTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {select.loading ? <Spinner /> : <List list={select.list} renderItem={renders.item}/>}
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} onPageClick={callbacks.changeCurrentPage} />
    </PageLayout>

  );
}

export default memo(Main);
