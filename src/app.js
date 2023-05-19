import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cartItems = store.getState().cartItems;
  const totalPrice = store.getState().totalPrice;
  const totalCount = store.getState().totalCount;

  // Состояния для модального окна
  const [showCart, setShowCart] = useState(false);
  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const callbacks = {
    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
      store.setTotalPrice();
      store.setTotalCount();
    }, [store]),

    onAddCartItem: useCallback((code) => {
      store.addCartItem(code);
      store.setTotalPrice();
      store.setTotalCount();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls openCart={openCart}
        totalPrice={totalPrice}
        totalCount={totalCount}
      />
      <List list={list}
        onAddCartItem={callbacks.onAddCartItem} />
      {showCart && <Modal closeCart={closeCart}>
        <Cart totalPrice={totalPrice}
          onDeleteCartItem={callbacks.onDeleteCartItem}
          cartItems={cartItems} />
      </Modal>}
    </PageLayout>
  );
}

export default App;
