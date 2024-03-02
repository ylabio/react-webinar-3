import React, { useState, useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const [modal, setModalState] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item.code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store])
  }

  let cartCount = cart.length;
  let cartSum = 0;

  if (cart.length > 0) {
    cart.forEach((item) => {
      cartSum += item.price * item.count;
    });
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <Controls cartCount={cartCount} cartSum={cartSum} text={'Перейти'} setModalState={setModalState} />
        <List list={list} text={'Добавить'}
          onItemClick={callbacks.onAddItem} />
      </PageLayout>
      <Modal cart={cart} cartSum={cartSum} modal={modal} setModalState={setModalState} onItemClick={callbacks.onDeleteItem} />
    </>
  );
}

export default App;
