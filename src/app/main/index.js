import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import NotFound from '../../components/not-found';
import { useNavigate } from 'react-router';

function Main() {
  const store = useStore();
  const [initLoad, setInitLoad] = useState(true);
  const navigate = useNavigate();
  const onMain = () => {
    navigate('/');
    callbacks.changePage(1);
  };

  useEffect(() => {
    if (initLoad) {
      store.actions.catalog.load();
      setInitLoad(false);
    } else {
      store.actions.catalog.getFetch(select.limitItem, select.currentPage);
    }
  }, [store.state.pagination.currentPage, store.state.pagination.limitItem]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    error: state.catalog.error,
    isLoading: state.catalog.isLoading,
    totalItems: state.catalog.totalItems,
    currentPage: state.pagination.currentPage,
    limitItem: state.pagination.limitItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const totalPages = Math.ceil(select.totalItems / select.limitItem);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback(number => store.actions.pagination.changePage(number), [store]),
    changeLimitItem: useCallback(
      number => store.actions.pagination.changeLimitItem(number),
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

  if (select.error) return <NotFound />;

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        main={'Главная'}
        onMain={onMain}
      />
      {select.isLoading ? (
        <h2>Загрузка...</h2>
      ) : (
        <List list={select.list} renderItem={renders.item} />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
        onLimitItem={callbacks.changeLimitItem}
      />
    </PageLayout>
  );
}

export default memo(Main);
