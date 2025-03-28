import React, { useCallback, useState } from 'react';
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
  const { list, cart } = store.getState();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(code => store.addToCart(code), [store]),
    onRemoveFromCart: useCallback(code => store.removeFromCart(code), [store]),
    onCartOpen: () => setIsCartOpen(true),
    onCartClose: () => setIsCartOpen(false),
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cartCount={cartCount} cartTotal={cartTotal} onCartOpen={callbacks.onCartOpen} />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        onRemoveFromCart={callbacks.onRemoveFromCart}
      />
      <Modal isOpen={isCartOpen} onClose={callbacks.onCartClose} cartTotal={cartTotal}>
        <List list={cart} onRemoveFromCart={callbacks.onRemoveFromCart} isCart={true} />
      </Modal>
    </PageLayout>
  );
}

export default App;
