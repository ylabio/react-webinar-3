import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';
import Controls from './components/controls';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => unsubscribe();
  }, [store]);

  const { list = [], cart = [], cartTotal = 0, cartSum = 0 } = state;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],),

    onRemoveFromCart: useCallback(
      (code) => 
        store.removeFromCart(code), 
      [store]),
      
    onOpenCart: useCallback(
      () => setIsCartOpen(true), 
      []),

    onCloseCart: useCallback(
      () => setIsCartOpen(false), 
      []),
  };

  return (
    <PageLayout>
      <Head title="Магазин"/>

      <Controls
        onOpenCart={callbacks.onOpenCart}
        cartTotal={cartTotal}
        cartSum={cartSum}
      />
      
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
      
      {isCartOpen && (
        <CartModal 
          cart={cart} 
          items={list} 
          onRemoveFromCart={callbacks.onRemoveFromCart} 
          onClose={callbacks.onCloseCart} 
        />
      )}
    </PageLayout>
  );
}

export default App;
