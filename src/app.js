import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [showModal, setShowModal] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const sum = store.getState().sum;

  function handleModal() {
    setShowModal((show) => !show);
  }

  const callbacks = {
    addItemToCart: useCallback(
      (code) => {
        store.itemToCart(code);
      },
      [store]
    ),

    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        handleModal={handleModal}
        sum={sum}
        cart={cart}
        showModal={showModal}
        children={"Перейти"}
      />
      <List list={list} handleCart={callbacks.addItemToCart} title="Добавить" />
      <Modal showModal={showModal}>
        <Head title="Корзина" handleModal={handleModal} children="Закрыть" />
        <List list={cart} handleCart={callbacks.onDeleteItem} title="Удалить" />
      </Modal>
    </PageLayout>
  );
}

export default App;
