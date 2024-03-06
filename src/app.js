import React, {useCallback,useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';
import { ModalProvider } from './components/modalContext';
import Modal from './components/modal';
import item from './components/item';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {

  const list = store.getState().list;
  const BasketList = store.getState().BasketList;
  const ListInfo = store.getState().ListInfo;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddItemBasket: useCallback((item) => {
      store.addItemBasket(item);
    }, [store]),

    onDeleteItemBasket: useCallback((item) => {
      store.deleteItemBasket(item);
    }, [store]),


  }
 
  
  
  return (
    <ModalProvider>
      <PageLayout>
        <Basket basketList={BasketList} onFunc={callbacks.onDeleteItemBasket} info={ListInfo} ></Basket>
        <Head title='Магазин'/>
        <Controls basketList={BasketList} info={ListInfo}/>
        <List list={list}
              onFunc={callbacks.onAddItemBasket}
              button='Добавить' Items = {item}/>
      </PageLayout>
    </ModalProvider>
  );
}

export default App;
