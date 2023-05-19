import React, { useCallback, useEffect } from "react";
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
  const { modalOpenStatus, list, basket } = store.getState();

  const callbacks = {
    onAddItem: useCallback(
      (item) => {
        store.addItemToBasket(item);
      },
      [store]
    ),
    onDeleteItemFromBasket: useCallback(
      (id) => {
        store.deleteItemFromBasket(id);
      },
      [store]
    ),
    onToggle: useCallback(
      (status) => {
        store.setModalOpenStatus(status);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onToggle={callbacks.onToggle} basket={basket} />
      <List list={list} onItemAddToBasket={callbacks.onAddItem} />

      <Modal
        basket={basket}
        openStatus={modalOpenStatus}
        onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}
        onToggle={callbacks.onToggle}
      />
    </PageLayout>
  );
}

export default App;
