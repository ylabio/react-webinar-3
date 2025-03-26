import React, { useCallback } from 'react';
import List from './components/list';
import Cart from './components/cart';
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

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cart={cart} onDeleteItem={callbacks.onDeleteItem} />
      <List list={list} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem} />
    </PageLayout>
  );
}

export default App;
