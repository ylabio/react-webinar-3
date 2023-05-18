import React, {useCallback, useState} from 'react';
import PageLayout from "./components/page-layout";
import Head from "./components/head";
import HeaderCart from './components/header-cart';
import List from "./components/list";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isCartOpen, setCartOpen] = useState(false);

  const list = store.getState().list,
        cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code)
    }, [store]),
    onToggleCart: useCallback(() => {
      setCartOpen(isCartOpen => !isCartOpen);
    }, [isCartOpen])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <HeaderCart cart={cart} onToggleCart={callbacks.onToggleCart}/>
      <List list={list} onAddToCart={callbacks.onAddToCart}/>
      {isCartOpen && <Cart onToggleModal={callbacks.onToggleCart} cart={cart} onDeleteFromCart={callbacks.onDeleteFromCart} />} 
    </PageLayout>
  );
}

export default App;
