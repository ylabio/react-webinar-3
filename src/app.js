import React, {useCallback} from 'react';
import Basket from "./components/basket";
import Modal from "./components/modal";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, modal, cart} = store.getState();
  
  const callbacks = {
    forOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    forCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),

    forAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} callback={callbacks.forOpenModal}/>
      <List list={list} callback={callbacks.forAddToCart}/>
      <Modal state={modal} children>
        <Basket callback={callbacks.forCloseModal}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
