import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const itemsInCart = [...store.itemsInCart];
  const [amount, setAmount] = useState(0);
  const [sum, setSum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const callbacks = {
    onAddItemInCart: useCallback((code) => {
      store.addItemInCart(code);
      store.initAmountItems(setAmount, setSum);
    }, [store]),

    onDeleteItemInCart: useCallback((code) => {
      store.deleteItemInCart(code);
      store.initAmountItems(setAmount, setSum);
    }, [store]),

    getAmountItems: useCallback(() => {
      store.getAmountItems();
    }, [store])
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCartAmount={amount} sumPrices={sum} showModal={showModal} setShowModal={setShowModal}/>
      <List list={list} onAddItemInCart={callbacks.onAddItemInCart}/>
      <Modal list={itemsInCart} onDeleteItemInCart={callbacks.onDeleteItemInCart} sumPrices={sum} active={showModal} onClose={closeModal}/>
    </PageLayout>
  );
}

export default App;
