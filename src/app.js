import React, { useCallback } from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { Modal } from './components/modal';
import { CartProvider } from './cart-context';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <CartProvider>
      <PageLayout>
        <Head title="Магазин" />
        <Cart />
        <List list={list} />
        <Modal title="Корзина" />
      </PageLayout>
    </CartProvider>
  );
}

export default App;
