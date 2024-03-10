import React, { useCallback } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),

    openCart: useCallback(() => {
      store.openCart();
    }, [store]),

    closeCart: useCallback(() => {
      store.closeCart();
    }, [store]),
  };

  return (
    <PageLayout>
      <Cart
        cart={cart}
        isCartOpen={store.cartOpen}
        closeCart={callbacks.closeCart}
        deleteItem={callbacks.onDeleteItem}
      />
      <Head cart={cart} openCart={callbacks.openCart} text="Магазин" />
      <List items={list} onClick={callbacks.onAddItem} text="Добавить" />
    </PageLayout>
  );
}

export default App;