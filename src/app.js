import React, { useCallback, useState } from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import ModalHead from './components/modal-head';
import ModalBody from './components/modal-body';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItemInCart: useCallback(
      item => {
        store.addItemInCart(item);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cartList={cartList} openModal={openModal} />
      <List
        list={list}
        onAddItemInCart={callbacks.onAddItemInCart}
      />
      {isModalOpen &&
        <ModalLayout closeModal={closeModal} cartList={cartList}>
          <ModalHead title="Корзина" closeModal={closeModal} />
          <ModalBody>
            <List list={cartList} isModalOpen={isModalOpen} onDeleteItem={callbacks.onDeleteItem} />
          </ModalBody>
        </ModalLayout>
      }
    </PageLayout>
  );
}

export default App;
