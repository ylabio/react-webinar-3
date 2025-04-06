import { memo, useCallback, useEffect } from 'react';
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

  const paginationInfo = useSelector(state => ({
    amount: state.catalog.count,
    curPage: state.catalog.curPage,
    limit: state.catalog.limit,
  }));

  useEffect(() => {
    store.actions.catalog.load(paginationInfo.limit, paginationInfo.limit * (paginationInfo.curPage - 1));
    store.actions.catalog.setCount();
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
    changePage: useCallback(
      page => {
        store.actions.catalog.load(paginationInfo.limit, paginationInfo.limit * (page - 1));
        store.actions.catalog.setCurPage(page);
        console.log({ paginationInfo });
      },
      [store, paginationInfo.limit],
    ),
    changeLimit: useCallback(
      limit => {
        store.actions.catalog.load(limit, paginationInfo.limit * (paginationInfo.curPage - 1));
        store.actions.catalog.setLimit(limit);
        store.actions.catalog.setCurPage(paginationInfo.curPage);
      },
      [store, paginationInfo.limit],
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
        amount={paginationInfo.amount}
        curPage={paginationInfo.curPage}
        limit={paginationInfo.limit}
        onChangePage={callbacks.changePage}
        onChangeLimit={callbacks.changeLimit}
      />
    </PageLayout>
  );
}

export default memo(Main);
