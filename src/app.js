import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const sum = store.getState().sum;

  const [isOpenModal, setOpenModal] = useState(false);

  const cartListLength = cartList.length;

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = e => {
    e.stopPropagation();
    setOpenModal(false);
  };

  const callbacks = {
    onAddItemToCartList: useCallback(
      item => {
        store.addItemToCartList(item);
      },
      [store],
    ),

    onDeleteItemFromCartList: useCallback(
      code => {
        store.deleteItemFromCartList(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cartListLength={cartListLength} sum={sum} openModal={openModal} />
      <List list={list} onAddItemToCartList={callbacks.onAddItemToCartList} />

      {isOpenModal && (
        <ModalLayout title={'Корзина'} closeModal={closeModal} sum={sum}>
          <List
            isOpenModal={isOpenModal}
            list={cartList}
            onDeleteItemFromCartList={callbacks.onDeleteItemFromCartList}
          />
        </ModalLayout>
      )}
    </PageLayout>
  );
}

export default App;
