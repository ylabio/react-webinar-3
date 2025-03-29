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
  const modalType = store.getState().modalType;

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
      (type = null) => {
        store.toggleModal(type);
      },
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
        onToggleCartModal={() => callbacks.onToggleModal('cart')}
        totalUniqueItems={totalUniqueItems}
        totalPrice={formattedTotalPrice}
      />
      <List list={list} buttonAction={callbacks.onAddToCart} buttonText={'Добавить'} />
      {modalType === 'cart' && (
        <Modal onCloseModal={() => callbacks.onToggleModal(null)} modalTitle={'Корзина'}>
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
