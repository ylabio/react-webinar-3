/* import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
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
    </PageLayout>
  );
}

export default memo(Main);
 */
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const skip = (currentPage - 1) * pageSize;
    store.actions.catalog.load({ limit: pageSize, skip });
  }, [currentPage, pageSize, store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    handlePageChange: useCallback(page => setCurrentPage(page), []),
    // Изменение количества элементов на странице
    handlePageSizeChange: useCallback(newSize => {
      setPageSize(newSize);
      setCurrentPage(1); // Сброс на первую страницу при изменении размера
    }, []),
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
      <List list={select.list} renderItem={renders.item} />
      {select.count > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={select.count}
          pageSize={pageSize}
          onPageChange={callbacks.handlePageChange}
          onPageSizeChange={callbacks.handlePageSizeChange}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
