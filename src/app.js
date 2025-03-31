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

  const { list = [], cart = [] } = state;

  const cartTotal = cart.length; //кол-во уникальных товаров
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0); //кол-во штук общее
  const cartSum = cart.reduce((sum, item) => {
    const product = list.find(p => p.code === item.code);
    return sum + (product.price * item.quantity);
  }, 0); //сумма общая

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
      />
      
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart} 
        cartTotal={cartTotal} 
        cartItemsCount={cartItemsCount}
        cartSum={cartSum} 
        onOpenCart={callbacks.onOpenCart} 
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
