import React from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import { STRINGS } from './const';
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
        <Head title={STRINGS.STORE} />
        <Cart />
        <List list={list} />
        <Modal title={STRINGS.CART} />
      </PageLayout>
    </CartProvider>
  );
}

export default App;
