import React, { useCallback, useEffect, useState } from 'react';
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
  const { list, cartList, totalPrice, countCartList } = store.getState();

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),
    onGetTotalPrice: useCallback(() => {
      store.getTotalPrice();
    }, [store]),
    onCountItem: useCallback(() => {
      store.countItem();
    }, [store])
  }

  useEffect(() => {
    callbacks.onGetTotalPrice()
    callbacks.onCountItem()
  }, [cartList])

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Cart total={totalPrice} count={countCartList} setActive={setActive} />
      <List list={list} onAction={callbacks.onAddItem} onGetTotalPrice={callbacks.onGetTotalPrice} title='Добавить' />
      {active && <Modal list={cartList} setActive={setActive} onDeleteItem={callbacks.onDeleteItem} total={totalPrice} />}
    </PageLayout>
  );
}

export default App;
