import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { Cart } from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartItemsCount = Object.keys(cart).length;
  const cartTotalPrice = Object.keys(cart).reduce((acc, code) => {
    acc += cart[code].reduce((acc, item) => (acc += item.price), 0);
    return acc;
  }, 0);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart itemsCount={cartItemsCount} totalPrice={cartTotalPrice} />
      <List list={list} onAddToCart={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
