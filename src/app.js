import React, { useState, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import PageLayout from './components/page-layout';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const cartValue = store.getState().cartValue;
  
  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),




    onAddCartItem: useCallback(
      item => {
        store.addCartItem(item);
      },
      [store],
    ),

    onDeleteCartItem: useCallback(
      code => {
        store.deleteCartItem(code);
      },
      [store],
    ),

    onGetTotalCash: useCallback(() => {
      store.getTotalCash();
    }, [store]),

    onGetTotalAmount: useCallback(() => {
      store.getTotalAmount();
    }, [store]),
  };


  const [isOpenModal, setIsOpenModal] = useState(false); // По умолчанию false (модалка закрыта)
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        onOpen={openModal}
        item={cartValue}
      />
      <List
        list={list}
        onAction={callbacks.onAddCartItem}
        title={"Добавить"}
      />
      <Modal
        list={cartList}
        onAction={callbacks.onDeleteCartItem}
        title={"Удалить"}
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
        item={cartValue}
      />
    </PageLayout>
  );
}

export default App;
