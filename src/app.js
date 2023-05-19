import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Controls from './components/controls';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();

  const callbacks = {
    onAddCartItem: useCallback(
      (code) => {
        store.addCartItem(code);
      },
      [store]
    ),
    onDeleteCartItem: useCallback(
      (code) => {
        store.deleteCartItem(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls onDeleteCartItem={callbacks.onDeleteCartItem} cart={cart} />
      <List
        list={list}
        onClick={callbacks.onAddCartItem}
        buttonTitle={'Добавить'}
      />
    </PageLayout>
  );
}

export default App;
