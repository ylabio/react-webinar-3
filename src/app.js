import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
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
        <Controls />
        <List list={list} />
      </PageLayout>
    </CartProvider>
  );
}

export default App;
