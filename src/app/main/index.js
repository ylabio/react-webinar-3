import { memo, useCallback, useEffect } from 'react';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.pagination.page,
    limit: state.pagination.limit,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.limit, select.page);
  }, [store, select.limit, select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Клик по номеру страницы
    onPageChange: useCallback(
      count => {
        store.actions.pagination.onPageChange(count);
      },
      [store],
    ),
    // Клик по выбору количества товаров на странице
    onShowChange: useCallback(
      count => {
        store.actions.pagination.onLimitChange(count);
      },
      [store],
    ),
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
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.page}
        onPageChange={callbacks.onPageChange}
        currentShow={select.limit}
        onShowChange={callbacks.onShowChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
