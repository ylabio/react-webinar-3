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
  const cartTotal = store.getState().cartTotal;
  const uniqueItemsCount = store.getState().uniqueItemsCount;

  const [modalOpen, setModalOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

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
        uniqueItemsCount={uniqueItemsCount}
        setModalOpen={setModalOpen}
        cartTotal={cartTotal}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cartItems={cartItems}
        onRemoveFromCart={callbacks.onRemoveFromCart}
        cartTotal={cartTotal}
      />
    </PageLayout>
  );
}

export default App;
