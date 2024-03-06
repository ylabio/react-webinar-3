import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal  from "./components/Modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().CartList; 
  const [isActive, setIsActive] = useState(false);


  const callbacks = {
    onAddCart: useCallback(
      (item) => {
        store.addToCart(item);
      },
      [store]
    ),
    onDeleteItem: useCallback(
      (item) => {
        store.deleteItem(item);
      },
      [store]
    ),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls 
      setIsActive={setIsActive}
      cartList = {cart}/>
      <List list={list}
            onAddCart={callbacks.onAddCart}/>
      <CartModal 
      isActive={isActive}
      setIsActive={setIsActive}
      deleteItem={callbacks.onDeleteItem}
      cartList = {cart}/>      
    </PageLayout>
  );
}

export default App;
