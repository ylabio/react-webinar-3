import React, {useCallback, useEffect, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/Modal';
import OrderDetails from './components/order-Details';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showModal, setShowModal] = useState(false)

  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onOpenPopUp: (e) => {
      setShowModal(true);
    },

    onClosePopUp: (e) => {
      setShowModal(false);
    },

    onAddItem: useCallback((item) => {
        store.addItem(item)
      }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code)
    }, [store]),
  }

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenPopUp={callbacks.onOpenPopUp} totalPrice={basket.totalPrice} itemsCount={basket.list.length}/>
      <List
        list={list}
        onClick={callbacks.onAddItem}></List>
    </PageLayout>

    {showModal && <Modal onClosePopUp={callbacks.onClosePopUp}>
      <OrderDetails
        basket={basket}
        onDeleteItem={callbacks.onDeleteItem}
        onClosePopUp={callbacks.onClosePopUp}>
      </OrderDetails>
    </Modal>}
    </>
  );
}

export default App;
