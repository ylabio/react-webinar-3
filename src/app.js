import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartControl from './components/cart-control';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const callbacks = {
    onClickItem: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls>
        <CartControl store={store} />
      </Controls>

      <List list={list} onClickItem={callbacks.onClickItem} />
    </PageLayout>
  );
}

export default App;
