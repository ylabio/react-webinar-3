import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartButton from './components/cart-button';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const { cart } = store.getState();

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
      <CartButton
        onToggle={callbacks.onToggleCart}
        totalCount={cart.totalCount}
        totalAmount={cart.totalAmount}
      />
      <CartModal
        items={cart.items}
        totalAmount={cart.totalAmount}
        isOpen={cart.isOpen}
        onClose={() => store.toggleCart()}
        onRemove={(code) => store.removeFromCart(code)}
      />
      <List
        list={state.list}
        onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
