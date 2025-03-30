import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import PageModal from './components/page-modal';
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, cartItemsCount, cartTotalPrice, isVisibleCart } = store.getState();

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
    <>
      <PageModal isVisible={isVisibleCart}>
        <Cart
          cart={cart}
          cartTotalPrice={cartTotalPrice}
          onVisibleCart={callbacks.onVisibleCart}
          handlerItem={callbacks.onDeleteItem}
        />
      </PageModal>

      <PageLayout>
        <Head title="Магазин" />

        <Controls
          cartItemsCount={cartItemsCount}
          cartTotalPrice={cartTotalPrice}
          toggleVisible={callbacks.onVisibleCart}
        />

        <List list={list} ItemComponent={Item} handlerItem={callbacks.onAddItem} />
      </PageLayout>
    </>
  );
}

export default App;
