import React, { useCallback } from 'react';
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
  const cart = store.getState().cart;
  const list = store.getState().list;
  const price = store.getState().price;
  const show = store.getState().showModal;
  const text = store.getState().text;

  const callbacks = {
    onAddItem: useCallback(
      item => {
        store.addItem(item);
      },
      [store],
    ),
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    onShowModal: useCallback(
      () => {
        store.showModalToggle();
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        text={text}
        showModal={callbacks.onShowModal}
      />
      <Modal
        cart={cart}
        price={price}
        showModal={show}
        onShowModal={callbacks.onShowModal}
        onDeleteItem={callbacks.onDeleteItem}
      />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
