import React, { useCallback, useState, useMemo } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpen, setIsOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    addToCart: useCallback(
      code => {
        store.setCart(code);
      },
      [store],
    ),

    deleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        cart={cart.items}
        cartLength={cart.totalCount}
        totalPrice={cart.totalPrice}
        setIsOpen={setIsOpen}
      />
      <List
        addToCart={callbacks.addToCart}
        list={list}
        type='main'
      />
      {
        isOpen && (
          <CartModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            cart={cart.items}
            totalPrice={cart.totalPrice}
            deleteFromCart={callbacks.deleteFromCart}
          />)
      }
    </PageLayout>
  );
}

export default App;
