import React, { useCallback, useState } from 'react';
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
  const list = store.getState().list;
  const totalPrice = store.getState().totalPrice;
  const cartItems = store.getCartItems();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),

    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onOpenModal: () => {
      setIsOpenModal(true);
    },

    onCloseModal: () => {
      setIsOpenModal(false);
    },
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onOpenModal={callbacks.onOpenModal}
        totalPrice={totalPrice}
        cartItemsCount={cartItems.length}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />

      <CartModal
        cartItems={cartItems}
        totalPrice={totalPrice}
        isOpen={isOpenModal}
        onClose={callbacks.onCloseModal}
        onDeleteItem={callbacks.onDeleteItem}
      />
    </PageLayout>
  );
}

export default App;
