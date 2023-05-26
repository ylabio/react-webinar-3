import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {Route, Routes} from "react-router-dom";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(select.limit, select.skip);
  }, [store.state.catalog.skip]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    countMax: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    nextPage: useCallback(() => store.actions.catalog.nextPage(), [store]),
    prevPage: useCallback(() => store.actions.catalog.prevPage(), [store]),
    goToFirstPage: useCallback(() => store.actions.catalog.goToFirstPage(), [store]),
    goToLastPage: useCallback(() => store.actions.catalog.goToLastPage(), [store]),
    prevTwoPage: useCallback(() => store.actions.catalog.prevTwoPage(), [store]),
    nextTwoPage: useCallback(() => store.actions.catalog.nextTwoPage(), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}/>
      <Routes>
        <Route path={'/'} element={
          <>
            <List list={select.list} renderItem={renders.item}/>
            <Pagination countMax={select.countMax}
                        limit={select.limit}
                        skip={select.skip}
                        nextPage={callbacks.nextPage}
                        prevPage={callbacks.prevPage}
                        goToFirstPage={callbacks.goToFirstPage}
                        goToLastPage={callbacks.goToLastPage}
                        prevTwoPage={callbacks.prevTwoPage}
                        nextTwoPage={callbacks.nextTwoPage}/>
          </>}/>
        <Route path={'*'} element={<p>Path not resolved</p>}/>
        <Route path={'/article'} element={<p>описание товара</p>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
