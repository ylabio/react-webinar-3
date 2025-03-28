import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpen, setIsOpen] = useState(false);
  const { list, cart } = store.getState();

  let price = 0;
  if (cart.length !== 0) {
    for (const ex of cart) {
      price += ex.price * ex.count;
    }
  }
  const cartCount = cart.length;

  const callbacks = {
    onAddToCart: useCallback(code => {
      store.addToCart(code);
    }),

    onDeleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code);
      },
      [store],
    ),

    onOpenModal: useCallback(() => {
      setIsOpen(true);
    }, [isOpen]),

    onCloseModal: useCallback(() => {
      setIsOpen(false);
    }, [isOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls count={cartCount} price={price} onOpen={callbacks.onOpenModal} />
      <List list={list} callback={callbacks.onAddToCart} isModal={false} />
      <Modal
        cart={cart}
        price={price}
        onDeleteFromCart={callbacks.onDeleteFromCart}
        isOpen={isOpen}
        onClose={callbacks.onCloseModal}
      ></Modal>
    </PageLayout>
  );
}

export default App;
