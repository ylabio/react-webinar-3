import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, modal } = store.getState();


  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),

      isModalOpen: useCallback(
        () => {
          store.isModalOpen();
        },
        [store]
      )

  };


  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls store={store} openCart={callbacks.isModalOpen} />
      <List
        list={list}
        onAdd={callbacks.onAddItem}
      />
      {modal && (
        <Modal onCLick={callbacks.isModalOpen}>
        <Cart store={store} onDelete={callbacks.onDeleteItem}/>
        </Modal>
      )}

    </PageLayout>
  );
}

export default App;
