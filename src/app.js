import React from 'react';
import { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const list = state.list;
  const cart = state.cart || [];
  const totalSum = state.totalSum || 0;
  const itemsCount = state.itemsCount || 0;
  const [isCartOpen, setIsCartOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      (code) => {
        store.removeFromCart(code);
      },
      [store],
    ),

    onToggleCart: useCallback(() => {
      setIsCartOpen(!isCartOpen);
    }, [isCartOpen]),
  }

  return (
    <PageLayout>
      <Head title="Приложение на React" />
      <Controls itemsCount={itemsCount} totalSum={totalSum} onToggleCart={callbacks.onToggleCart} />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={callbacks.onToggleCart}
          onRemoveFromCart={callbacks.onRemoveFromCart}
          totalSum={totalSum}
        />
      )}
    </PageLayout>
  )
}

export default App;