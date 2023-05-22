import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, isModalOpen } = store.getState();

  const callbacks = {
    onAddProduct: useCallback((code) => {
      store.addProduct(code);
    }),
    onDeleteProduct: useCallback((code) => {
      store.deleteProduct(code);
    }),
    onOpenModal: useCallback(() => {
      store.openModal();
    }),
    onCloseModal: useCallback(() => {
      store.closeModal();
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls list={list} onOpenModal={callbacks.onOpenModal} />
      <List list={list}
        onClick={callbacks.onAddProduct}
        title='Добавить' />

      {isModalOpen && (
        <Modal onClose={callbacks.onCloseModal} 
               list={list.filter(item => item.selected)} 
               onDelete={callbacks.onDeleteProduct}
               isModalOpen={isModalOpen} />
      )}
    </PageLayout>
  );
}

export default App;
