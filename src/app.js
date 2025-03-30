import React, { useCallback } from 'react';
import PageLayout from './components/page-layout';
import Head from './components/head';
import Controls from './components/controls';
import List from './components/list';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const { list, cart, isCartOpen, cartTotal, cartUniqueCount } = state;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),

    onToggleCart: useCallback(
      isOpen => {
        store.toggleCart(isOpen);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        count={cartUniqueCount}
        total={cartTotal}
        onClick={() => callbacks.onToggleCart(true)}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && (
        <CartModal
          cart={cart}
          total={cartTotal}
          onClose={() => callbacks.onToggleCart(false)}
          onRemoveItem={callbacks.onRemoveFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
