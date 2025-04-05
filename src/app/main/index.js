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

  useEffect(() => {
    store.actions.catalog.loadPage();
    store.actions.pagination.setTotalPages();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.pagination.currentPage,
    totalPages: state.pagination.totalPages,
    limit: state.pagination.limit,
  }));

  useEffect(() => {
    const skip = select.limit * (select.currentPage - 1);
    const limit = select.limit;
    store.actions.catalog.loadPage(limit, skip);
  }, [select.currentPage, select.limit]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение текущей страницы
    onChangePage: useCallback(item => store.actions.pagination.onChangePage(item), [store]),
    //Изменение количества данных на странице
    onChangeLimit: useCallback(newLimit => store.actions.pagination.onChangeLimit(newLimit), [store]),
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
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} onChangePage={callbacks.onChangePage} onChangeLimit={callbacks.onChangeLimit} limit={select.limit} />
    </PageLayout>
  );
}

export default memo(Main);
