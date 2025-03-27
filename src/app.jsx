import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const isVisibleCart = store.getState().isVisibleCart;

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
      [store]),

    onVisibleCart: useCallback(
      () => {
        store.visibleCart();
      },
      [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} onVisible={callbacks.onVisibleCart} />
      <Cart
        cart={cart}
        handlerListItem={callbacks.onDeleteItem}
        isVisible={isVisibleCart}
        onVisibleCart={callbacks.onVisibleCart}
        nameButton='Удалить'
        classActionButton='Item-actions__delete-btn'
      />
      <List
        list={list}
        handlerListItem={callbacks.onAddItem}
        nameButton='Добавить'
        classActionButton='Item-actions__add-btn'
      />
    </PageLayout>
  );
}

export default App;
