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
  const basket = store.getState().basket;
  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    addBasket: useCallback(
      (item) => {
        store.addBasket(item);
      },
      [basket]
    ),
    deleteBasket: useCallback(
      (item) => {
        store.deleteBasket(item);
      },
      [basket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        caption={"Перейти"}
        basket={basket}
        title={"В корзине:"}
        setIsOpen={setIsOpen}
      />
      <List list={list} onAddBasket={callbacks.addBasket} />
      {isOpen && (
        <Modal
          basket={basket}
          setIsOpen={setIsOpen}
          onDeleteBasket={callbacks.deleteBasket}
        />
      )}
    </PageLayout>
  );
}

export default App;
