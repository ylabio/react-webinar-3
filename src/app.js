import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const cartPrice = cart.reduce((acc, item) => acc + item.price * (item.count || 1), 0);

  const callbacks = {
    addItemToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),
    removeItemFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),
    toggleModal: useCallback(() => {
      setIsModalOpen(prev => !prev);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} cartPrice={cartPrice} onCartClick={callbacks.toggleModal} />
      <List list={list} onAddToCart={callbacks.addItemToCart} />
      {isModalOpen && (
        <Modal title="Корзина" onClose={callbacks.toggleModal}>
          <Cart cart={cart} cartPrice={cartPrice} onDelete={callbacks.removeItemFromCart} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
