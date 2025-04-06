import { memo, useCallback, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();
  useEffect(() => {
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    total: state.catalog.total,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      console.log('функция openModalBasket вызывается');
      store.actions.modals.open('basket');
    }, [store]),
    onPageChange: useCallback(page => store.actions.catalog.setPage(page), [store]),
    onLimitChange: useCallback(limit => store.actions.catalog.setLimit(limit), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        total={select.total}
        limit={select.limit}
        skip={select.skip}
        onPageChange={callbacks.onPageChange}
        onLimitChange={callbacks.onLimitChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
