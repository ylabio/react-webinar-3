import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Cart from "./components/cart";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Item from './components/item'
import CartItem from './components/cart/item'
import Total from './components/total'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const list = store.getState().list;
  const cart = store.getState().cart

  const callbacks = {
    handleAdd: useCallback((code) => {
      store.addItem(code);
    }, [store]),
    handleDelete: useCallback((code) => {
      store.deleteItem(code)
    }, [store]),
    handleModalState: () => {
      setIsOpenModal((prev) => !prev)
    }
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <Cart info={{length: cart.list.length, total: cart.total}} openModal={callbacks.handleModalState} />
        <List list={list}>
          <Item handleAdd={callbacks.handleAdd} />
        </List>
      </PageLayout>
      {isOpenModal &&
        <Modal title='Корзина' closeModal={callbacks.handleModalState}>
          <List list={cart.list}>
            <CartItem handleDelete={callbacks.handleDelete} />
          </List>
          <Total total={cart.total} />
        </Modal>}
    </>
  );
}

export default App;
