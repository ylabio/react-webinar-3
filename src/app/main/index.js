import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import LimitSelect from '../../components/limitselect';
import Control from '../../components/control';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.skip, select.limit]);

  console.log(123)

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setSkip: useCallback(skip => store.actions.catalog.setSkip(skip), [store]),
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
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Control>
        <LimitSelect setLimit={callbacks.setLimit} />
        <Pagination currentPage={select.skip} setSkip={callbacks.setSkip} />
      </Control>
    </PageLayout>
  );
}

export default memo(Main);
