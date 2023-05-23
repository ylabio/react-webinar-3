import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import {Cart} from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {cart, list} = store.getState();
  const [isCartVisible, setCartVisibility] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
    onRemoveFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    },[store]),
    onToggleCartVisibility: useCallback(() => {
      setCartVisibility(!isCartVisible);
    }, [isCartVisible])
  }

  return (
    <>
      {isCartVisible ? <Cart cart={cart} onAction={callbacks.onRemoveFromCart} onClose={callbacks.onToggleCartVisibility} /> : ""}
      <PageLayout>
        <Head title='Магазин'/>
        <Controls itemsCount={cart.totalQuantity} sum={cart.sum} onGo={callbacks.onToggleCartVisibility}/>
        <List list={list} onAction={callbacks.onAddToCart} />
      </PageLayout>
    </>
  );
}

export default App;
