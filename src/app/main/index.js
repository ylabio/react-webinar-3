import {memo, useCallback, useState, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Controls from "../../components/controls";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from '../../language-context';

function Main() {
  const { translate } = useLanguage();

  const store = useStore();
  const limit = 10;

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage, 
    totalPages: state.catalog.totalPages 
  }));

  useEffect(() => {
    store.actions.catalog.load(limit);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onPageChange: useCallback(page => store.actions.catalog.setCurrentPage(page), []),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} productLink={`product/${item._id}`} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={translate('Магазин')}/>
      <Controls onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} onPageChange={callbacks.onPageChange} />
    </PageLayout>

  );
}

export default memo(Main);
