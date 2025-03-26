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
      item => {
        store.setCart(item);
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

  const cartInfo = useMemo(() => {
    const newTotalPrice = cart.reduce((acc, item) => acc + item.count * item.price, 0);
    const newCartLength = cart.length;

    return {
      totalPrice: newTotalPrice,
      cartLength: newCartLength,
    };
  }, [cart]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        cart={cart}
        cartLength={cartInfo.cartLength}
        totalPrice={cartInfo.totalPrice}
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
            cart={cart}
            totalPrice={cartInfo.totalPrice}
            deleteFromCart={callbacks.deleteFromCart}
          />)
      }
    </PageLayout>
  );
}

export default App;
