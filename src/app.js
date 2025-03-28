import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store]
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store]
    ),

    onClearCart: useCallback(() => {
      store.clearCart();
    }, [store])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cart={cart}
        onAdd={callbacks.onAddItem}
        onRemoveFromCart={callbacks.onRemoveFromCart}
        onClearCart={callbacks.onClearCart}
        />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
