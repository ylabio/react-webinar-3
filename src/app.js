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
  const list = store.getState().list;
  const cart = store.getState().cart;
  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls setActive={setModalActive} />
      <List
        list={list}
        cart={cart}
        onDeleteItem={callbacks.onDeleteItem}
        onSelectItem={callbacks.onSelectItem}
      />
      <Modal active={modalActive} setActive={setModalActive} />
    </PageLayout>
  );
}

export default App;
