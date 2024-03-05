import React, {useCallback, useState, useEffect} from 'react';
import {calculatePrice} from './utils';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [openModal, setOpenModal] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = calculatePrice(cart);

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),

    onToggleAdd: useCallback((item) => {
      store.toggleAdd(item);
    }, [store])
  }

  /**
   * Отключаем скролл при открытом модальном окне
   */
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal])

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={cart} totalPrice={totalPrice} setOpenModal={setOpenModal} />
      <List list={list} onClick={callbacks.onToggleAdd} textBtn='Добавить' />

      {openModal && 
        <Modal title='Корзина' setOpenModal={setOpenModal}>
          <Cart list={cart} totalPrice={totalPrice} onClick={callbacks.onDeleteItem} />
        </Modal>
      }
    </PageLayout>
  );
}

export default App;
