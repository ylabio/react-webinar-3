import React, { useState, useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [CartOpen, setCartOpen] = useState(false);

  const { list, cart } = store.getState();

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onDeleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code);
      },
      [store],
    ),

    toggleCart: useCallback(() => {
      setCartOpen(prev => !prev);
    }, [CartOpen]),
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  //Можно вынести в store.

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart onCartClick={callbacks.toggleCart} totalPrice={totalPrice} totalItems={totalItems} />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      {CartOpen && (
        <CartModal
          cart={cart}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          onClose={callbacks.toggleCart}
          totalPrice={totalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;
