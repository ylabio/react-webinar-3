import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basketList = store.getState().basket;
  const controls = store.getState().controls;
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
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls controlsInfo={controls} showBasket={callbacks.showModal}/>
      <List
        list={list}
        onAddToBasket={callbacks.onAddToBasket}
      />
      { 
      isActiv ? 
      <Modal hideModal={callbacks.hideModal}>
        <Basket totalPrice={controls.totalPrice} basketItems={basketList} onDeleteItem={callbacks.onDellFromBasket} />
      </Modal> 
      : 
      ''
      }
    </PageLayout>
  );
}

export default App;
