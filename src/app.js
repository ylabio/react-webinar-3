import React, { useCallback } from "react";
import Cart from "./components/cart";
import Controls from "./components/controls";
import Head from "./components/head";
import List from "./components/list";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const callbacks = {
    onAddToCart: useCallback(
      (item) => {
        store.addToCart(item);
      },
      [store]
    ),
    onRemoveFromCart: useCallback(
      (item) => {
        store.removeFromCart(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} onOpenCart={openCart} />
      <List
        items={list}
        onButtonClick={callbacks.onAddToCart}
        buttonText={"Добавить"}
      />
      {isCartOpen && (
        <Modal title="Корзина" onClose={closeCart}>
          <Cart cart={cart} onRemoveFromCart={callbacks.onRemoveFromCart} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
