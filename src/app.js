import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/Cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const total = store.getState().total;

  const callbacks = {
    removeItemFromCart: useCallback(
      (c) => {
        store.removeItemFromCart(c);
      },
      [store]
    ),

    itogo: useCallback(() => {
      store.itog();
    }, [store]),

    onAddItem: useCallback(
      (c) => {
        store.addItem(c);
      },
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls cart={cart} total={total} />
        <List list={list} onAddItem={callbacks.onAddItem} />
      </PageLayout>
      <Cart
        cart={cart}
        itogo={callbacks.itogo}
        total={total}
        removeItem={callbacks.removeItemFromCart}
      />
    </>
  );
}

export default App;
