import React, { useCallback } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartRow from './components/cartRow';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, cart, isOpenModal } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),

    onOpenModal: useCallback(() => {
      store.setIsOpenModal(true);
    }, [store]),

    onCloseModal: useCallback(() => {
      store.setIsOpenModal(false);
    }, [store])
  }

  return (
    <PageLayout>
      <Modal isOpenModal={isOpenModal}>
        <Head title='Корзина' callback={callbacks.onCloseModal} />
        <Cart cart={cart}
          callback={callbacks.onDeleteFromCart} />
      </Modal>
      <Head title='Магазин' />
      <CartRow cart={cart} onOpenModal={callbacks.onOpenModal} />
      <List list={list}
        callback={callbacks.onAddToCart} />
    </PageLayout>
  );
}

export default App;
