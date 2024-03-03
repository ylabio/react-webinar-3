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

  const [modalOpen, setModalOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const shoppingCart = cart
    .sort((a,b) => a.code - b.code)
    .filter((item, index) => {return cart.indexOf(item) === index})

  const callbacks = {
    onDeleteCart: useCallback((code) => {
      store.deleteCart(code);
    }, [store]),

    onAddCart: useCallback((code) => {
      store.addCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Modal isOpen={modalOpen} modalClose={() => setModalOpen(false)} cart={shoppingCart} onDeleteCart={callbacks.onDeleteCart}/>
      <Head title='Магазин'/>
      <Controls modalOpen={() => setModalOpen(true)} cart={shoppingCart}/>
      <List list={list} onAddCart={callbacks.onAddCart}/>
    </PageLayout>
  );
}

export default App;