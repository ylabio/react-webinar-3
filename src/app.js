import React, {useCallback, useState} from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import Modal from './components/modal';
import ModalList from './components/modal-list';
import PageLayout from './components/page-layout';
import {numberFormat} from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const order = store.getState().order;
  const totalPrice = numberFormat(store.getState().cartTotalPrice);
  const orderLength = store.getState().orderLength;
  const [isOpen, setIsOpen] = useState(false);
  const callbacks = {
    onModalOpen: useCallback(() => {
      setIsOpen(!isOpen);
    }),
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),
    onDeleteItemFromCart: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Cart onModalOpen={callbacks.onModalOpen}
            totalPrice={totalPrice}
            count={orderLength}
            isOpen={isOpen}/>
      <Modal active={isOpen}
             setActive={setIsOpen}>
        <ModalList order={order}
                   totalPrice={totalPrice}
                   onDelete={callbacks.onDeleteItemFromCart}/>
      </Modal>
      <List list={list}
            type='main'
            onClickItem={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
