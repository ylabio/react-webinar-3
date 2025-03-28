import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const show = store.getState().showModal;
  const price = store.getState().price;
  const cart = store.getState().cart;
  const text = store.getState().text;

  const callbacks = {
    onShowModal: useCallback(() => {
      console.log('asd');

      store.showModalToggle();
    }, [store]),
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      item => {
        console.log(item);
        store.addItem(item);
      },
      [store],
    ),
  };

  return (
    <PageLayout
      cart={cart}
      price={price}
      showModal={show}
      onShowModal={callbacks.onShowModal}
      onDeleteItem={callbacks.onDeleteItem}
    >
      <Head title="Магазин" />
      <Controls text={text} showModal={callbacks.onShowModal} />
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
