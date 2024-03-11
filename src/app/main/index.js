import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import NavBar from "../../components/navbar";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ListNavigation from '../../components/list-navigation';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import ItemPage from '../itemPage';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    length: state.catalog.length,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Подробная информация по клику на товар
    SetSkip: useCallback((count) => store.actions.catalog.load(count),[store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket,callbacks.openItemInfo]),
  };

  return (
    <BrowserRouter>
    <Routes>
      {/* 
      * ----- Главная страница (path = "/")
      */}
      <Route path="/" element={
      <PageLayout>
        <Head title='Магазин'/>
        <NavBar onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
        <List list={select.list} renderItem={renders.item}/>
        <ListNavigation length={select.length}/>
      </PageLayout>}/>
      {/* 
      * ----- Информация о товаре (path = "/id")
      */}
      <Route path="/:id" element={
      <PageLayout>
        <ItemPage         
          onOpen={callbacks.openModalBasket} 
          amount={select.amount}
          sum={select.sum}
          />
      </PageLayout>
    }/>
    </Routes>
    </BrowserRouter>

  );
}

export default memo(Main);
