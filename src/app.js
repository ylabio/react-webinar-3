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

  console.log(store)

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    deleteItemCart: useCallback(
      code => {
        store.deleteItemCart(code);
      },
      [store],
    ),
    onAddItemCart: useCallback(
      (code, title, price) => {
        store.addItemCart(code, title, price);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls deleteItemCart={callbacks.deleteItemCart} cartList={store.state.cartList} />
      <List
        list={list}
        onAddItemCart={callbacks.onAddItemCart}
        onSelectItem={callbacks.onSelectItem}
      />
    </PageLayout>
  );
}

export default App;
