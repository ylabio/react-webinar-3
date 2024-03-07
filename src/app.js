import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart'
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const orders = store.getState().orders;
  const totalPrice = store.getState().totalPrice;
  const countOrders = store.getState().countOrders;

  const [modalActive, setModalActive] = useState(false)

  const callbacks = {
    onDelete: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelect: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAdd: useCallback((item) => {
      store.addItem(item);
    }, [store]),

  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls 
        setActive={setModalActive}
        orders={orders}
        totalPrice={totalPrice}
        countOrders={countOrders}/>
      <List list={list}
        onAdd={callbacks.onAdd} />
      <ModalLayout
        modalTitle='Корзина'
        active={modalActive}
        setActive={setModalActive}>
        <Cart 
        orders={orders}
        active={modalActive}
        setActive={setModalActive}
        onDelete={callbacks.onDelete}
        totalPrice={totalPrice}/>
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
