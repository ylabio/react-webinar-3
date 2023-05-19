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
  const { list, cartItems } = store.getState();

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.removeItemFromCart(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onDeleteItem={callbacks.onDeleteItem} items={cartItems} />
      <List title="Добавить" list={list} action={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
