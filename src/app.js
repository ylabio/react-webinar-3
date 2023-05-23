import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import { calculateSum } from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const amount =
    cart.length > 0 ? calculateSum(cart.map((item) => item.amount)) : 0;
  const sum =
    cart.length > 0
      ? calculateSum(cart.map((item) => item.price * item.amount))
      : 0;
  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteCartGoods(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (code) => {
        store.addGoods(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls amount={amount} sum={sum} setActive={setModalActive} />
      <List
        list={list}
        cart={cart}
        onDeleteItem={callbacks.onDeleteItem}
        onAddItem={callbacks.onAddItem}
      />
      <Modal
        cart={cart}
        sum={sum}
        onDeleteItem={callbacks.onDeleteItem}
        active={modalActive}
        setActive={setModalActive}
      />
    </PageLayout>
  );
}

export default App;
