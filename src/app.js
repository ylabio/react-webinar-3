import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Cart from "./components/cart";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [active, setActive] = useState(false)
  const { list, cartList } = store.getState();
  const goods = cartList.length
  const totalPrice = cartList.reduce((prev, next) => prev + next.price * next.count, 0);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Cart total={totalPrice} count={goods} setActive={setActive} />
      <List list={list} onAction={callbacks.onAddItem} title='Добавить' />
      {active && <Modal list={cartList} setActive={setActive} onDeleteItem={callbacks.onDeleteItem} total={totalPrice} />}
    </PageLayout>
  );
}

export default App;
