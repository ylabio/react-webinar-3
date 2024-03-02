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
  const cartList = store.getCartItems().list;
  const totalPrice = calculatePrice(cartList);

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),

    onAddInCart: useCallback((item) => {
      store.addInCart(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cartList={cartList} totalPrice={totalPrice} setOpenCart={setOpenCart} />
      <List list={list} onClick={callbacks.onAddInCart} textBtn='Добавить' />
      {openCart && 
        <Cart cartList={cartList} totalPrice={totalPrice} setOpenCart={setOpenCart} onDeleteItem={callbacks.onDeleteItem} />
      }
    </PageLayout>
  );
}

export default App;
