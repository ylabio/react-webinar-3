import React, { useCallback } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./page-layout";
import ModalWindow from "./components/modal-window";
import Item from "./components/item";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCost = store.getState().totalCost;

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (code) => {
        store.addItem(code);
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
      <ModalWindow isCartOpen={store.cartOpen}>
        <Cart
          cart={cart}
          closeCart={callbacks.closeCart}
          deleteItem={callbacks.onDeleteItem}
        />
      </ModalWindow>

      <Head
        cart={cart}
        totalCost={totalCost}
        openCart={callbacks.openCart}
        text="Магазин"
      />
      <List items={list} onClick={callbacks.onAddItem} text="Добавить"></List>
    </PageLayout>
  );
}

export default App;
