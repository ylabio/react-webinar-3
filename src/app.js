import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index";
import { cn as bem } from "@bem-react/classname";
import Cart from "./components/Cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList ?? [];
  const isCartModalOpen = store.getState().isCartModalOpen;

  const cartTotalPrice = cartList.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  const cartItemCount = cartList.reduce((total, item) => total + item.count, 0);

  const callbacks = {
    onDeleteCartItem: useCallback(
      (code) => {
        store.onDeleteCartItem(code);
      },
      [store]
    ),

    toggleCartModal: useCallback(() => {
      store.toggleCartModal();
    }, [store]),
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),
  };
  console.log({ cartList });
  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          onOpenModal={callbacks.toggleCartModal}
          cartTotalPrice={cartTotalPrice}
          cartItemCount={cartItemCount}
        />
        <List
          list={list}
          onActionClick={callbacks.onAddToCart}
          actionName="Добавить"
          onAddToCart={callbacks.onAddToCart}
        />
      </PageLayout>

      <Modal
        isShowing={isCartModalOpen}
        hide={callbacks.toggleCartModal}
        title="Корзина"
      >
        <Cart
          list={cartList}
          cartTotalPrice={cartTotalPrice}
          cartItemCount={callbacks.cartItemCount}
          onDelete={callbacks.onDeleteCartItem}
        />
      </Modal>
    </>
  );
}

export default App;
