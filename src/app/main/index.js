import {memo, useCallback, useEffect, useState} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from "../../components/pagination";

function Main() {
  const store = useStore();
  const [countPages, setCountPages] = useState(2);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(limit, currentPage);
  }, [limit, currentPage]);

  useEffect(() => {
      select.count
      && setCountPages(Math.ceil(select.count / limit));
  }, [select.count, limit]);

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
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} onChangePage={setCurrentPage}/>
      <List
        list={select.list}
        renderItem={renders.item}
        renderPagination={
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={countPages}
            onLimitChange={setLimit}
            limit={limit}
            options={[
              {value: 5, name: '5'},
              {value: 10, name: '10'},
              {value: 20, name: '20'},
            ]}
          />
        }
      />
    </PageLayout>
  );
}

export default memo(Main);
