import React, { useState, useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import CartButton from './components/cart-button';
import ProductItem from './components/product-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalOpen, setModalOpen] = useState(false);

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
    }, []),
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
        renderItem={item => <ProductItem item={item} onAddToCart={callbacks.onAddToCart} />}
      />
      {modalOpen && (
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
