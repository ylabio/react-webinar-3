import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from "./components/cart";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const productsInCart = store.getState().productsInCart;

  const isCartShown = store.getState().isCartShown;

  const callbacks = {
    onBuyItem: useCallback(
      (code) => {
        store.buyItem(code);
      },
      [store]
    ),

    onDeleteItem: useCallback(
      (code) => {
        store.deteleItemFromCart(code);
      },
      [store]
    ),

    onSetCartVisibility: useCallback(
      (visibility) => {
        store.setCartVisibility(visibility);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        productsInCart={productsInCart}
        showModal={callbacks.onSetCartVisibility}
      />
      <List list={list} onBuyItem={callbacks.onBuyItem} />

      <Cart
        isVisible={isCartShown}
        productsInCart={productsInCart}
        showModal={callbacks.onSetCartVisibility}
        onDeleteItem={callbacks.onDeleteItem}
      />
    </PageLayout>
  );
}

export default App;
