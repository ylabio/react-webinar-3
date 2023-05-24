import { memo, useCallback, useEffect } from 'react';
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import Item from "../../components/item";
import List from "../../components/list";
import PageLayout from "../../components/page-layout";
import Paginator from '../../components/paginator';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Main() {

  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    //store.actions.catalog.load();
    store.actions.catalog.loadPage(select.page.current);
  }, [select.page.current, select.page.limit])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключаем страничку
    switchPage: useCallback(selected => {
      if (select.loading)
        return;
      store.actions.catalog.setCurrentPage(selected);
    }, [select.loading]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Paginator total={select.page.total} current={select.page.current} onClick={callbacks.switchPage} />
    </PageLayout>

  );
}

export default memo(Main);
