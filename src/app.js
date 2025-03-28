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
  const list = store.getState().list;
  const cartItems = store.getState().cartItems;

  const [modalOpen, setModalOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onGetCartTotal: useCallback(() => {
      return store.getCartTotal();
    }, [store]),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartItems={cartItems}
        onGetCartTotal={callbacks.onGetCartTotal}
        setModalOpen={setModalOpen}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cartItems={cartItems}
        onGetCartTotal={callbacks.onGetCartTotal}
        onRemoveFromCart={callbacks.onRemoveFromCart}
      />
    </PageLayout>
  );
}

export default App;
