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
  const list = store.getState().list;
  const basketList = store.getState().basket;
  const { isActiv } = store.getState().modal;

  const callbacks = {
    onAddToBasket: useCallback((item) => {
      store.addToBasket(item);
    }, [store]),

    onDellFromBasket: useCallback((code) => {
      store.removeFromBasket(code)
    }, [store]),

    showModal: useCallback(() => {
      store.showModal();
    }, [store]),

    hideModal: useCallback(() => {
      store.hideModal();
    }, [store])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls showBasket={callbacks.showModal} basketList={basketList} />
      <List
        list={list}
        onAddToBasket={callbacks.onAddToBasket}
      />
      { isActiv ? <Modal hideModal={callbacks.hideModal} basketItems={basketList} onDeleteItem={callbacks.onDellFromBasket} /> : ''}
    </PageLayout>
  );
}

export default App;
