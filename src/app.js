import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/cart/modal';

import {plural, numGoods, sumGoods} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

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

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls description={`В корзине: ${num ? num + ` ${plural(num, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
        })}/` +
        sumGoods(list) +
        ' ₽' : 'пусто'}`} actions={[{name: 'Перейти', action: () => callbacks.onShowModal(true)}]}/>
      <List list={list} show={['code', 'title', 'price', 'add']} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
      <Modal list={list} isShowModal={isShowModal} onShowModal={callbacks.onShowModal} onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
    </PageLayout>
  );
}

export default App;
