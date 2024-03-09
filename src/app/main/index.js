import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { lang } from '../../data/lang';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.pagination.loadTotalAmount();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.pagination.page,
    totalAmount: state.pagination.totalAmount,
    lang: state.lang.lang,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.load(select.page);
  }, [select.page])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка текущей страницы
    setCurrentPage: useCallback(page => store.actions.pagination.setPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <Head title={lang[select.lang].titles.main} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination totalAmount={select.totalAmount} currentPage={select.page}
                  onChangePage={callbacks.setCurrentPage} />
    </>

  );
}

export default memo(Main);
