import React, {useCallback, useState, useRef, useEffect} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/cart/modal';

import {plural, numGoods, sumGoods} from "./utils";
import { initList, mainList } from './config';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  console.log("app")

  const list = store.getState().list;

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
  
  const num = numGoods(list);
  const controls = useRef([{name: 'Перейти', action: () => callbacks.onShowModal(true)}]);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls description={`В корзине: ${num ? num + ` ${plural(num, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
        })}/` +
        sumGoods(list) +
        ' ₽' : 'пусто'}`} actions={controls}/>
      <List list={initList} show={mainList} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
      {isShowModal ? <Modal list={list} isShowModal={isShowModal} onShowModal={callbacks.onShowModal} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/> : null}
    </PageLayout>
  );
}

export default App;
