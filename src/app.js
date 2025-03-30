import React, { useState, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import ModalWindow from './components/modal-window';
import Cart from './components/cart';
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
        <ModalWindow onModalStateChange={callbacks.onModalStateChange}>
          <Cart 
            cart={cart} 
            onDeleteItem={callbacks.onDeleteItem}
          />
        </ModalWindow> : 
        <></>
      }
    </PageLayout>
  );
}

export default App;
