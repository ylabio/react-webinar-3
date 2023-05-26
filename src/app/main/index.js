import {memo, useCallback, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Details from '../../components/details';
import HomePage from '../../components/home-page';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
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
        <Route path='/' element={<HomePage list={select.list} renderItem={renders.item} />} />
        <Route path='/details' element={<Details  onAdd={callbacks.addToBasket}/>} />
      </Routes>
    </PageLayout>

  );
}

export default memo(Main);
