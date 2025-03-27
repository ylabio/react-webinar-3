import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

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

  const { list = [], cart = {} } = state;

  const cartTotal = Object.keys(cart).length;
  const cartSum = Object.entries(cart).reduce((sum, [code, quantity]) => {
    const item = list.find(i => i.code === Number(code));
    return sum + (item.price * quantity);
  }, 0);

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
      <Head 
      title="Магазин" 
      cartTotal={cartTotal} 
      cartSum={cartSum} 
      onOpenCart={callbacks.onOpenCart} 
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
