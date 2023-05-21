import React, {useCallback, useState} from 'react';
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
function App({store}) {

  const [modal, setModal] = useState(false)
  const {list, cart, cartTotalPrice } = store.getState();


  const callbacks = {
    addToCart: (useCallback((code) => {
      store.addToCart(code);
    }, [store])),

    deleteFromCart: (useCallback((code) => {
      store.deleteFromCart(code);
    }, [store])),

    handleModal: () => {
      setModal(!modal)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls
        cart={cart}
        handleModal={callbacks.handleModal}
        totalPrice={cartTotalPrice}
      />
      <List
        list={list}
        addToCart={callbacks.addToCart}
      />
      {modal && <Modal
        totalPrice={cartTotalPrice}
        handleModal={callbacks.handleModal}
        cart={cart}
        deleteFromCart={callbacks.deleteFromCart}
      />}
    </PageLayout>
  );
}

export default App;
