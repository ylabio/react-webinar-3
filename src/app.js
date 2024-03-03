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
  const cart = [...new Set(store.getState().cart)];

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
        cart={cart}
        showModal={showModal}
        children={"Перейти"}
      />
      <List list={list} handleCart={callbacks.addItemToCart} title="Добавить" />
      <Modal
        handleModal={handleModal}
        handleCart={callbacks.onDeleteItem}
        showModal={showModal}
        cart={cart}
        title="Удалить"
      />
    </PageLayout>
  );
}

export default App;
