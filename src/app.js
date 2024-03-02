import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal/index';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cartCount = store.getState().count;
  const totalPrice = store.getState().totalPrice;
  const cartItems = store.getState().cartItems;
  const modal = store.getState().modal;


  const callbacks = {
    removeItemFromCart: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    openModal: useCallback(() => {
      store.openModal();
    }, []),
    closeModal: useCallback(() => {
      store.closeModal();
    }, []),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cartCount={cartCount} totalPrice={totalPrice} goToCart={callbacks.openModal} />
      <List list={list}
        onAddItem={callbacks.onAddItem}
        openModal={callbacks.openModal} />
      {
        modal && <Modal closeModal={callbacks.closeModal} title={'Корзина'} >
          <Cart cartItems={cartItems} totalPrice={totalPrice} removeItemFromCart={callbacks.removeItemFromCart} />
        </Modal>
      }
    </PageLayout>
  );
}

export default App;
