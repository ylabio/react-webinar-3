import React, { useState, useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import CartButton from './components/cart-button';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [ModalOpen, setModalOpen] = useState(false);

  const { list, cart, totalItems, totalPrice } = store.getState();

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onDeleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code);
      },
      [store],
    ),

    toggleModal: useCallback(() => {
      setModalOpen(prev => !prev);
    }, [ModalOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartButton
        onCartClick={callbacks.toggleModal}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        onDeleteFromCart={callbacks.onDeleteFromCart}
        inCart={false}
      />
      {ModalOpen && (
        <Modal>
          <Cart
            cart={cart}
            onDeleteFromCart={callbacks.onDeleteFromCart}
            onClose={callbacks.toggleModal}
            totalPrice={totalPrice}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
