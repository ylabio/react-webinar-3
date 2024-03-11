import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadItems: useCallback((page) => store.actions.catalog.load(page), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
    head: useCallback(() => {
      return <Head title='Магазин' />
    }, []),
  };

  return (
    <PageLayout head={renders.head()} onOpen={callbacks.openModalBasket} amount={select.amount}
      sum={select.sum}>
      <List list={select.list} renderItem={renders.item} />
      <Pagination count={select.count} loadItems={callbacks.loadItems} limit={10} />
    </PageLayout>

  );
}

export default memo(Main);
