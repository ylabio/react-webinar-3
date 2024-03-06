import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index";
import Cart from "./components/Cart";
import formatPrice from './utils'

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
          actionName="Добавить"
          onActionClick={callbacks.onAddToCart}
        />
      </PageLayout>

      <Modal
        isShowing={isCartModalOpen}
        hide={callbacks.toggleCartModal}
        title="Корзина"
      >
        <Cart
          list={cartList}
          cartTotal={cartTotalPrice}
          cartItemCount={cartItemCount}
          onActionClick={callbacks.onDeleteCartItem}
          currencySymbol='шт'
        />
      </Modal>
    </>
  );
}

export default App;
