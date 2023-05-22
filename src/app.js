import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import './css/style.css';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [ cartVisible, setCartVisible ] = useState(false);

  const list = store.getState().list;
  const cartContent = store.getState().cart;
  const cartSummary = store.getState().cartSummary;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
    onCartItemDelete: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),
    onShowCart: useCallback(() => {
      setCartVisible(true);
    }, [cartVisible]),
    onCloseCart: useCallback(() => {
      setCartVisible(false);
    }, [cartVisible])
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cartSummary={cartSummary} showCart={callbacks.onShowCart}/>
      <List list={list} ItemComp={Item} handleControl={callbacks.onAddToCart}/>
      <Cart cartContent={cartContent} 
            showModal={cartVisible}
            cartSummary={cartSummary}
            closeCart={callbacks.onCloseCart} 
            cartItemDelete={callbacks.onCartItemDelete}/>
    </PageLayout>
  );
}

export default App;
