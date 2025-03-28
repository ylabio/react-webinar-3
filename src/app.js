import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal/';
import ModalCart from './components/modal-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const listCart = store.getState().listCart;

  const [isModalOpen, setIsModalOpen] = useState(false);

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

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),

    getCartPrice: useCallback(
      () => {
        store.getCartPrice();
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Приложение на React" />
      <Controls store={store} onModalOpen={() => setIsModalOpen(true)} />
      <List list={list} onClickItem={callbacks.onAddItem} btnName='Добавить'/>
      <Modal title="Корзина" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalCart store={store} onClick={callbacks.onDeleteItem} />
      </Modal>
    </PageLayout>
  );
}

export default App;
