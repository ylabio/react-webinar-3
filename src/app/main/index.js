import {memo, useCallback, useEffect, useState} from 'react';
import { Route, Routes} from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemDetails from "../../components/item-details";
import Navigate from "../../components/navigate/";
import PageNotFound from "../../components/page-not-found"
import Shop from "../../components/shop"
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useLangContext} from "../../store/use-lang-context";
import translate from "../language/translate.json";
import './style.css';

function Main() {
  const store = useStore();
  const {language} = useLangContext();
  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    details: state.catalog.details
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModalBasket: useCallback(() => store.actions.modals.close(), [store]),
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
        {Object.keys(select.details).length ? <Head title={select.details.title}/> : <Head title={translate.Shop[language]}/>}
        <div className='row'>
          <Navigate />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </div>
        <Routes>
          <Route path="/*" element={<Shop list={select.list} renderItem={renders.item} pagesCount={select.pages} callbacks={callbacks} currentPage={select.currentPage}/>}/>
          <Route path="/:id" element={<ItemDetails onLoadDetails={callbacks.onLoadDetails} onAdd={callbacks.addToBasket}/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </PageLayout>
  );
}

export default memo(Main);
