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
    onDeleteFromCart: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onShowCartItems: useCallback(() => {
      store.showCartItems();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onShowCart={callbacks.onShowCartItems} cart={cart} list={list} />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
