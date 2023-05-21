import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ModalLayout from "./components/modal-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

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
      store.addItem(code);
    }, [store]),
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <PageLayout>
        <Head title="Приложение на чистом JS" />
        <Controls onFunc={() => setIsOpen(true)} title={"Перейти"} />
        <List
          list={list}
          onAddItem={callbacks.onAddItem}
          onDeleteItem={callbacks.onDeleteItem}
          onSelectItem={callbacks.onSelectItem}
          btnItem={"Добавить"}
        />
      </PageLayout>
      <ModalLayout isOpen={isOpen}>
        <Modal
          store={store}
          setIsOpen={setIsOpen}
          onDeleteItem={callbacks.onDeleteItem}
          onSelectItem={callbacks.onSelectItem}
          list={list}
        />
      </ModalLayout>
    </>
  );
}

export default App;
