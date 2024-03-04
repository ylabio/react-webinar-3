import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal"
import item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalVisible, setModalVisibility] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      console.log(store.state.cart);
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),

    onToggleModal: useCallback(() => {
      setModalVisibility(!isModalVisible);
      console.log(cart);
    }, [isModalVisible])
  }

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onToggleModal={callbacks.onToggleModal} cart={cart}/>
      <List list={list}
            onAddItem={callbacks.onAddItem}/>
    </PageLayout>
    <Modal show={isModalVisible}
     totalPrice={cart.reduce((acc, item) => acc + item.price * item.amount, 0)}>
      <Head title='Корзина' isCart={true} closeModal={callbacks.onToggleModal}/>
      <Controls onToggleModal={callbacks.onToggleModal} cart={cart} isCart={true}/>
      <List list={cart}
            isCart={true}
            onDeleteItem={callbacks.onDeleteItem}/>
    </Modal>
    </>
  );
}

export default App;
