import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import Cart from './components/cart';

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

      <ModalLayout isOpen={isOpenModal} onClose={callbacks.onCloseModal}>
        <Cart
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClose={callbacks.onCloseModal}
          onDeleteItem={callbacks.onDeleteItem}
        />
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
