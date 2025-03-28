import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import CartModal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const cart = state.cart || { items: [], isOpen: false };

  const callbacks = {
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    onToggleCart: useCallback(() => {
      store.toggleCart();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        items={cart.items}
        onToggle={callbacks.onToggleCart}
      />
      <CartModal
        items={cart.items}
        isOpen={cart.isOpen}
        onClose={callbacks.onToggleCart}
        onRemove={callbacks.onRemoveFromCart}
      />
      <List
        list={state.list}
        onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
