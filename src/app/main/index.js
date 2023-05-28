import {memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Menu from '../../components/menu';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();

    return () => store.actions.catalog.clear();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),

    onPageChange: (pageNumber) => {
      store.actions.catalog.load(pageNumber);
    },
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            path={`/articles/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Menu>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Menu>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onPageChange={callbacks.onPageChange}
        totalCount={select.count}
        currentPage={select.currentPage}
        pageSize={10}
      />
    </PageLayout>
  );
}

export default memo(Main);
