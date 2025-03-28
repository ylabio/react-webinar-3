import React, { useCallback, useState, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const { list, cart } = store.getState();

  const callbacks = {
    openModal: useCallback(() => {
      setModalOpen(true);
    }, []),

    addToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    removeFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
  };

  const totalCartValue = useMemo(
    () => ({
      uniqItems: cart.length,
      price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    [cart],
  );

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls openModal={callbacks.openModal} totalCartValue={totalCartValue} />
        <List list={list} listType="list" onHandleButton={callbacks.addToCart} />
      </PageLayout>

      <Modal open={isModalOpen} close={() => setModalOpen(false)} title="Корзина">
        <List list={cart} listType="cart" onHandleButton={callbacks.removeFromCart} />
      </Modal>
    </>
  );
}

export default App;
