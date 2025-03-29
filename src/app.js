import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import { formatNumber } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, totalUnicItems, totalPrice } = store.getState();
  const [isCartOpen, setCartOpen] = useState(false);
  const formattedPrice = formatNumber(totalPrice);

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),
    onRemoveFromCart: useCallback(
      (code) => {
        store.removeFromCart(code);
      },
      [store]
    ),
    onCartOpen: () => setCartOpen(true),
    onCartClose: () => setCartOpen(false),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          totalUnicItems={totalUnicItems}
          totalPrice={formattedPrice}
          onCartOpen={callbacks.onCartOpen}
        />
        <List list={list} onAddToCart={callbacks.onAddToCart} />
      </PageLayout>
      
      {isCartOpen && (
        <Modal title="Корзина" onClose={callbacks.onCartClose}>
          <Cart
            cart={cart}
            totalPrice={formattedPrice}
            onRemoveFromCart={callbacks.onRemoveFromCart}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
