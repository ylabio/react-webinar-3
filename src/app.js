import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [modal, setModal] = useState(false)

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      
      {modal && (
        <Modal setModal={setModal}>
          <Head title="Корзина" setModal={setModal} />
          <List list={list} onDeleteFromCart={callbacks.onDeleteFromCart} />
        </Modal>
      )}

      <Head title="Магазин" />
      <Controls onAdd={callbacks.onAddItem} list={list} setModal={setModal} />
      <List list={list} onAddToCart={callbacks.onAddToCart} />

    </PageLayout>
  );
}

export default App;
