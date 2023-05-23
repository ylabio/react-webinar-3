import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalActive, setModalActive] = useState(false);

  const list = store.getState().list; 
  const orders = store.getState().orders; 
  const totalSumCart = store.totalSumCart 
  
  console.log(list, orders)

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToOrder: useCallback(
      item => {
        store.addToOrder(item)
      },
      [store]
    )
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>     
      <Controls orders={orders} totalSumCart ={totalSumCart} onAdd={callbacks.onAddItem} setActive={setModalActive} />
      <List list={list} onAddToOrder={callbacks.onAddToOrder} active={modalActive}/>
      <Modal active={modalActive}>
        <Cart orders={orders} totalSumCart ={totalSumCart} onDeleteItem={callbacks.onDeleteItem} setActive={setModalActive}/>
      </Modal>   
    </PageLayout>
  );
}

export default App;
