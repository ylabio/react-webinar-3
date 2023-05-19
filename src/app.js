import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import ProductsPage from './components/products-page';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ state: { store, cart } }) {
  const list = store.getState().list;
  const cartItems = cart.getState().cart;

  const [showModal, setShowModal] = useState(false);

  const callbacks = {
    showModal: useCallback(() => {
      setShowModal((prev) => !prev);
    }, [store]),
    onAddItem: useCallback(
      (item) => {
        cart.addItem(item);
      },
      [store]
    ),
    onDeleteFromCart: useCallback(
      (item) => {
        cart.deleteItem(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout onShowModal={callbacks.showModal} showModal={showModal}>
      {showModal && (
        <Modal
          showModal={callbacks.showModal}
          cart={cartItems}
          deleteItem={callbacks.onDeleteFromCart}
          sum={cart.getState().sum}
        />
      )}
      <ProductsPage
        showModal={callbacks.showModal}
        cnt={cart.getState().cnt}
        sum={cart.getState().sum}
        list={list}
        addItem={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
