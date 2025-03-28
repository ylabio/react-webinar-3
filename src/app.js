import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;
  const cartList = Object.values(store.getState().cart);
  const uniqueCount = cartList.length;
  const totalPrice = cartList.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    removeFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
    onCartClick: () => setCartOpen(true),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls 
          onCartClick={callbacks.onCartClick} 
          uniqueCount={uniqueCount} 
          totalPrice={totalPrice}
        />
        <List
          list={list}
          onAddToCart={callbacks.onAddToCart}
        />
      </PageLayout>
      {isCartOpen &&
        <Modal onClose={() => setCartOpen(false)}>
          <Cart removeFromCart={callbacks.removeFromCart} list={cartList} totalPrice={totalPrice}/>
        </Modal>
      }

    </>
  );
}

export default App;
