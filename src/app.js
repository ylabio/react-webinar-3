import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import { getCartStats } from './utils.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = list.filter(item => item.cartQuantity);
  const { totalCost, uniqueItems } = getCartStats(cartList);

  const callbacks = {
    onDeleteItemCart: useCallback(
      code => {
        store.deleteItemCart(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItemCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        onDelete={callbacks.onDeleteItemCart}
        cartList={cartList}
        totalCost={totalCost}
        uniqueItems={uniqueItems}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
