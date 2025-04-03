import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    pageSize: state.catalog.pageSize,
    isLoading: state.catalog.isLoading,
    error: state.catalog.error,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handlePageChange: useCallback(
      page => {
        store.actions.catalog.load({ page });
      },
      [store],
    ),
    handlePageSizeChange: useCallback(
      newSize => {
        // Рассчитываем индекс первого элемента текущей страницы в общем списке
        const globalItemIndex = (select.currentPage - 1) * select.pageSize;

        // Вычисляем новую страницу, где окажется этот элемент
        const newPage = Math.floor(globalItemIndex / newSize) + 1;

        store.actions.catalog.load({
          page: newPage,
          limit: newSize,
        });
      },
      [store, select.currentPage, select.pageSize],
    ),
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} />,
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

      {select.isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : select.error ? (
        <div className="error">{select.error}</div>
      ) : (
        <>
          <List list={select.list} renderItem={renders.item} />
          {select.count > select.pageSize && (
            <Pagination
              currentPage={select.currentPage}
              totalItems={select.count}
              pageSize={select.pageSize}
              onPageChange={callbacks.handlePageChange}
              onPageSizeChange={callbacks.handlePageSizeChange}
            />
          )}
        </>
      )}
    </PageLayout>
  );
}

export default memo(Main);
