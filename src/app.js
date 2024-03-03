import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [showModal, setShowModal] = useState(false);

  const list = store.getState().list;
  const cartSum = store.getCartSum();

  const callbacks = {
    getCartSum: useCallback(() => {
      store.getCartSum()
    }, [store]),

    addToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),

    removeFromCart: useCallback((code) => {
      store.removeFromCart(code)
    }, [store]),
  }

  return (
    <>
      {showModal &&
        <Modal
          cart={list}
          cartSum={cartSum.sum}
          onRemoveItem={callbacks.removeFromCart}
          onShowModal={setShowModal}/>}
      <PageLayout>
        <Head title='Магазин'/>
        <Controls cartSum={cartSum} onShowModal={setShowModal}/>
        <List list={list}
              onClick={callbacks.addToCart} />
      </PageLayout>
    </>
  );
}

export default App;
