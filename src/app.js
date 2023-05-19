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
  const cartItems = cart.getState();

  const [showModal, setShowModal] = useState(false);

  function closeModal(e) {
    if (showModal && e.target.id === 'root') {
      callbacks.showModal();
    }
  }

  document.body.addEventListener('click', closeModal);

  useEffect(() => {
    return () => document.body.removeEventListener('click', closeModal);
  });

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
    <PageLayout>
      {showModal && (
        <Modal
          showModal={callbacks.showModal}
          items={cartItems}
          deleteItem={callbacks.onDeleteFromCart}
          sum={cart.getCartSum()}
        />
      )}
      <ProductsPage
        showModal={callbacks.showModal}
        cnt={cart.getItemsCnt()}
        sum={cart.getCartSum()}
        list={list}
        action={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
