import {memo, useCallback, useEffect, useState, useRef} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";
import ToolPages from "../../components/tool-pages";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    count: state.catalog.count
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id,0), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      document.body.style.overflow = "hidden";
      store.actions.modals.open('basket');
    }, [store]),
    // Открытие страницы в каталоге
    openPageToCatalog: useCallback((page) => store.actions.catalog.setPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

const activeModal = useSelector((state) => {return(state.modals.name)});

  return (
    <>
    <main>
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <ToolPages page={select.page+1} count={select.count+1} openPageToCatalog={callbacks.openPageToCatalog}/>
    </PageLayout>
    </main>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(Main);
