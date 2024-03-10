import {memo, useCallback, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import ItemDetails from "../../components/item-details";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangePage: useCallback(page => store.actions.catalog.load(page), [store]),
    onLoadDetails: useCallback(id => store.actions.catalog.loadDetails(id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <Routes>
        <Route path="/*" element={<List list={select.list} renderItem={renders.item}/>} />
        <Route path="/:id" element={<ItemDetails onLoadDetails={callbacks.onLoadDetails} onAdd={callbacks.addToBasket}/>}/>
      </Routes>

      <Pagination pagesCount={select.pages} onChangePage={callbacks.onChangePage} currentPage={select.currentPage}/>
    </PageLayout>
  );
}

export default memo(Main);
