import React, { useCallback } from 'react';
import Cart from './components/cart';
import Controls from './components/controls';
import Head from './components/head';
import List from './components/list';
import Modal from './components/modal';
import PageLayout from './components/page-layout';
import { formatNumber } from './utils';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const isModalOpen = store.getState().isModalOpen;

  const callbacks = {
    onAddToCart: useCallback(
      item => {
        store.addToCart(item);
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      item => {
        store.removeFromCart(item);
      },
      [store],
    ),

    onToggleModal: useCallback(
      () => store.toggleModal(),

      [store],
    ),
  };

  const totalUniqueItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const formattedTotalPrice = formatNumber(totalPrice);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onToggleCartModal={callbacks.onToggleModal}
        totalUniqueItems={totalUniqueItems}
        totalPrice={formattedTotalPrice}
      />
      <List list={list} buttonAction={callbacks.onAddToCart} buttonText={'Добавить'} />
      {isModalOpen && (
        <Modal onCloseModal={callbacks.onToggleModal} modalTitle={'Корзина'}>
          <Cart
            cart={cart}
            onRemoveFromCart={callbacks.onRemoveFromCart}
            totalPrice={formattedTotalPrice}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
