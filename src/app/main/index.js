import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import PageSelect from '../../components/page-select';
import './style.css';

function Main() {
  const store = useStore();
  const [currentPage, setCurrenPage] = useState(1);
  const [sizePage, setSizePage] = useState(10);

  useEffect(() => {
    store.actions.catalog.load({ current: currentPage, perPage: sizePage });
  }, [currentPage, sizePage]);

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
      <div className={'Footer'}>
        <PageSelect current={sizePage} onSizeChange={setSizePage} />
        <Pagination
          current={currentPage}
          perPage={sizePage}
          total={select.count}
          setPage={setCurrenPage}
        />
      </div>
    </PageLayout>
  );
}

export default memo(Main);
