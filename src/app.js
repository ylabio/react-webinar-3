import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Order from './components/order';
import './style.css'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const list = store.getState().list;
  const order = store.getState().order;

  const callbacks = {
    onAddToOrder: useCallback(
      (code) => {
        store.addToOrder(code);
      },
      [store]
    ),

    onDeleteOrder: useCallback(
      (code) => {
        store.deleteOrder(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls order={order} setIsOpenModal={setIsOpenModal} />
      <List
        buttonTitle={'Добавить'}
        list={list}
        onClick={callbacks.onAddToOrder}
      />
      <Order
        buttonTitle={'Удалить'}
        order={order}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onDeleteOrder={callbacks.onDeleteOrder}
      />
    </PageLayout>
  );
}

export default App;
