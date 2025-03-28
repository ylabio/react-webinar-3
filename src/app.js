import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const modalOpen = store.getState().modalOpen;
  const totalItem = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const callbacks = {
    onDeleteItem: useCallback(
      item => {
        store.deleteItem(item);
      },
      [store],
    ),
    
    onAddItem: useCallback(
      item => {
        store.addItem(item);
      },
      [store],
    ),

    onClickModal: useCallback(() => store.clickModal(), [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onClickModal={callbacks.onClickModal}
        totalItem={totalItem}
        totalPrice={totalPrice}
      />
      <List list={list} buttonAction={callbacks.onAddItem} />
      {modalOpen && (
        <Modal onCloseModal={callbacks.onClickModal}>
          <Cart cart={cart} onDeleteItem={callbacks.onDeleteItem} totalPrice={totalPrice} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
