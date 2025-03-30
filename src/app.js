import React, { useState, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Backdrop from './components/backdrop';
import ModalWindow from './components/modal-window';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [ modalOpen, setModalOpen ] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onModalStateChange: () => setModalOpen(!modalOpen),

    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      }, 
      [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        sum={cart.fullPrice}
        count={cart.products.length} 
        onModalStateChange={callbacks.onModalStateChange}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        isCart={false}
      />
      {modalOpen ? 
        <Backdrop>
          <ModalWindow 
            cart={cart} 
            onModalStateChange={callbacks.onModalStateChange}
            onDeleteItem={callbacks.onDeleteItem}
          />
        </Backdrop> : 
        <></>
      }
    </PageLayout>
  );
}

export default App;
