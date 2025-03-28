import React, { useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [showCartModal, setShowCartModal] = useState(false); // Управление состоянием модалки корзины

  const state = store.getState();
  const list = state.list;
  const cartItems = state.cartItems || [];
  const totalPrice = store.calculateTotalPrice();
  const totalItems = store.calculateTotalItems();

  const callbacks = {
    onAddToCart: code => {
      store.addToCart(code);
    },
    onRemoveFromCart: code => {
      store.removeFromCart(code);
    },
    onToggleCartModal: () => {
      //console.log("До изменения состояния:", showCartModal);
      //setShowCartModal(true);
      setShowCartModal(prevState => !prevState);
      //console.log("После изменения состояния:", showCartModal);
    },
  };

  return (
    <PageLayout>
      <Head title="Магазин"  />
      <Controls totalItems={totalItems} totalPrice={totalPrice} onToggleCartModal={callbacks.onToggleCartModal} />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      <CartModal
        cartItems={cartItems}
        totalPrice={totalPrice}
        isOpen={showCartModal}
        onClose={callbacks.onToggleCartModal}
        onRemoveFromCart={callbacks.onRemoveFromCart}
      />
    </PageLayout>
  );
}

export default App;