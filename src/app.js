import React, { useCallback, useState } from 'react';
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
  const list = store.getState().list;
  const basket = store.getState().basket || [];
  const [modalIsActive, setModalIsActive] = useState(false);
  const callbacks = {
    onRemFromBasket: useCallback(
      item => {
        store.remFormBasket(item);
      },
      [store],
    ),
    onAddToBasket: useCallback(
      item => {
        store.addToBasket(item);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls basket={basket} setIsActive={setModalIsActive} />
      <List list={list} callbacks={callbacks} />
      <Modal
        basket={basket}
        callbacks={callbacks}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </PageLayout>
  );
}

export default App;
