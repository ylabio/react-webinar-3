import React, { useCallback, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const isModalOpen = store.getState().modalOpen;
  const cartList = store.getState().cart;

  const cartInfo = useMemo(() => {
    const cartTotalCount = cartList.length;
    const cartTotalPrice = Number(cartList.reduce((acc, item) => acc + item.count * item.price, 0));

    return {cartTotalCount, cartTotalPrice};
  }, [cartList]);


  const callbacks = {

    modalHandler: useCallback(
      () => {
        store.setModalState();
      },
      [store]
    ),

    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store]
    ),

    onDeleteFromCart: useCallback(
      code => {
        store.removeFromCart(code)
      }, [store])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        controlsHandler={callbacks.modalHandler}
        count={cartInfo.cartTotalCount}
        totalPrice={cartInfo.cartTotalPrice}
      />
      <List
        list={list}
        onAddItem={callbacks.onAddToCart}
        onDeleteItem={callbacks.onDeleteFromCart}
      />
      {isModalOpen && (
        <Modal
          onClose={callbacks.modalHandler}
        >
          <Cart
            cartList={cartList}
            totalPrice={cartInfo.cartTotalPrice}
            onAdd={callbacks.onAddToCart}
            onDelete={callbacks.onDeleteFromCart}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
