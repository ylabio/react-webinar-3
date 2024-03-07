import React, {useCallback, useState, useRef, useEffect} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import cartPreview from './components/cart-preview';
import ItemCart from './components/item-cart';
import ItemMain from './components/item-main';

import {plural, numGoods, sumGoods, formatPrice} from "./utils";
import { initList, mainList, modalList } from './config';
import Sum from './components/sum';
import CartPreview from './components/cart-preview';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  console.log("app")

  const list = store.getState().list;
  const cart = store.getState().cart;
  const num = store.getState().num;
  const sum = store.getState().sum;

  const [isShowModal, setIsShowModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onShowModal: useCallback((isOpen) => {
      setIsShowModal(isOpen);
    }, [store]),
  }
  
  //const num = numGoods(list);
  const controlsOpenModal = useRef([{name: 'Перейти', action: () => callbacks.onShowModal(true)}]);
  const controlsCloseModal = useRef([{name: 'Закрыть', action: () => callbacks.onShowModal(false)}]);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls description={<CartPreview sum={sum} num={num}/>} actions={controlsOpenModal}/>
      <List list={list} type={ItemMain} show={mainList} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
      {isShowModal ? <Modal cart={cart} list={list} isShowModal={isShowModal} head={<Head title={'Корзина'} actions={controlsCloseModal}/>}
        onShowModal={callbacks.onShowModal} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}>
          <List list={list.map(item => {
              let count = cart.find(item2 => item2.code === item.code)?.count;
              return count ? { ...item, count} : item;
          })}
          type={ItemCart} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
          <Sum sum={sum}/>
      </Modal> : null}
    </PageLayout>
  );
}

export default App;
