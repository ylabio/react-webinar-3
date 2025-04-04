import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Navbar from '../../components/navbar';
import PaginationTool from '../../components/pagination-tool';
import { useSearchParams } from 'react-router';

function Main() {
  const store = useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    store.actions.catalog.load(limit, currentPage);
  }, [currentPage, limit]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    // Пагинация
    onPageChange: useCallback(page => {
      setSearchParams(params => {
        params.set('page', page);
        return params;
      });
      // setCurrentPage(page);
    }, []),
    onLimitChange: useCallback(limit => setLimit(limit), []),
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

      <Navbar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />

      <PaginationTool
        currentPage={currentPage}
        totalPages={select.totalPages}
        onPageChange={callbacks.onPageChange}
        onLimitChange={callbacks.onLimitChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
