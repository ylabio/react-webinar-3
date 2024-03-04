import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart"
import ModalLayout from './components/modal-layout';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart
  const [showModal, setShowModal] = useState(false)
  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store])
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <Controls cart={cart} openModal={() => setShowModal(true)} />
        <List
          type='articles'
          list={list}
          action={callbacks.addToCart} />
      </PageLayout>
      {showModal &&
        <ModalLayout>
          <Cart deleteFromCart={callbacks.deleteFromCart} cart={cart} closeModal={() => setShowModal(false)} />
        </ModalLayout>
      }
    </>
  );
}

export default App;
