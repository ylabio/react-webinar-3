import React, {useCallback,useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';
import { BasketProvider } from './components/basketContext';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {

  const list = store.getState().list;
  const BasketList = store.getState().BasketList;

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
    <BasketProvider>
      <PageLayout>
        <Basket basketList={BasketList} onFunc={callbacks.onDeleteItemBasket}></Basket>
        <Head title='Магазин'/>
        <Controls basketList={BasketList}/>
        <List list={list}
              onFunc={callbacks.onAddItemBasket}
              button='Добавить'/>
      </PageLayout>
    </BasketProvider>
  );
}

export default App;
