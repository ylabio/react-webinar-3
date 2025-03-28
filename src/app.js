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

  const callbacks = {
    onDeleteItem: useCallback(
      id => {
        store.deleteItem(id);
      },
      [store],
    ),

    onAddItem: useCallback(
      (id, name, price) => {
        store.addItem(id, name, price);
      },
      [store],
    ),

    getItemsCount: () => {
      return store.getItemsCount();
    },

    getTotalPrice: () => {
      return store.getTotalPrice();
    },

    getCart: () => {
      return store.getCart();
    },
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        itemsCount={callbacks.getItemsCount()}
        totalPrice={callbacks.getTotalPrice()}
        cart={callbacks.getCart()}
        onDeleteItem={callbacks.onDeleteItem}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
