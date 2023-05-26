import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import useTranslate from '../../hooks/use-translation';

function Main() {
  const DEFAULT_LIMIT = 10;
  const store = useStore();
  //const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslate();

  // useEffect(() => {
  //   store.actions.catalog.load(DEFAULT_LIMIT, (currentPage-1) * 10);
  // }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    skip: state.catalog.skip,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(DEFAULT_LIMIT, (select.currentPage-1) * 10);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка текущей страницы
    setCurrentPage: useCallback((page) => store.actions.catalog.setPage(page), [store]),
  }

  const renders = {
    item: useCallback((item, routePath) => {
      return <Item item={item} onAdd={callbacks.addToBasket} routePath={routePath}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={t('Магазин')}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination  currentPage={select.currentPage} onPageChange={callbacks.setCurrentPage} count={select.count} skip={select.skip} limit={select.limit}/>
    </PageLayout>

  );
}

export default memo(Main);
