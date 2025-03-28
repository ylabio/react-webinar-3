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
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onDeleteFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    )
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cart={cart}
        list={list}
        onDeleteFromCart={callbacks.onDeleteFromCart}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        onDeleteFromCart={callbacks.onDeleteFromCart}
        isInCart={false}
        cart={cart}
      />
    </PageLayout>
  );
}

export default App;
