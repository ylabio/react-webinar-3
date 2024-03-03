import React, {useCallback, useState} from 'react';
import {calculatePrice} from './utils';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [openCart, setOpenCart] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = calculatePrice(cart);

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),

    onToggleAdd: useCallback((item) => {
      store.toggleAdd(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={cart} totalPrice={totalPrice} setOpenCart={setOpenCart} />
      <List list={list} onClick={callbacks.onToggleAdd} textBtn='Добавить' />
      {openCart && 
        <Cart list={cart} totalPrice={totalPrice} setOpenCart={setOpenCart} onClick={callbacks.onDeleteItem} />
      }
    </PageLayout>
  );
}

export default App;
