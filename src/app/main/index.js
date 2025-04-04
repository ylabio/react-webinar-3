import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import NavHead from '../../components/nav-head';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    pagination: useCallback(
      (limit, skip) => store.actions.catalog.pagination(limit, skip),
      [store],
    ),

    setLimit: useCallback(limit => store.actions.catalog.setLimit(limit), [store]),
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
      <NavHead onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        pagination={callbacks.pagination}
        count={select.count}
        setLimit={callbacks.setLimit}
        limit={select.limit}
      />
    </PageLayout>
  );
}

export default memo(Main);
