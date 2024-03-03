import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    addToCart: useCallback((code) => {
        store.addToCart(code)
      }, [store]),

    removeFromCart: useCallback((code) => {
        store.removeFromCart(code)
      }, [store])
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls showModal={setModalActive} items={cart} />
        <List list={list} addToCart={callbacks.addToCart}/>
      </PageLayout>

      <Modal active={modalActive} setActive={setModalActive}>
        <Cart list={cart} showModal={setModalActive} removeFromCart={callbacks.removeFromCart} />
      </Modal>
    </>
  );
}

export default App;
