import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalOverlay from "./components/modal-overlay";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModal, setIsModal] = React.useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    calculateSum: () => {
      return cart.reduce((acc, piece) => acc + piece.price * piece.count, 0);
    },

    calculateItems: () => {
      return cart.length;
    },

    onEntryCart: useCallback(() => {
      setIsModal(!isModal);
    }, [isModal]),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),
  };
  
  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls
        calculateSum={callbacks.calculateSum}
        onEntryCart={callbacks.onEntryCart}
        calculateItems={callbacks.calculateItems}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
      {isModal && (
        <>
          <Modal
            cart={cart}
            onEntryCart={callbacks.onEntryCart}
            calculateSum={callbacks.calculateSum}
            calculateItems={callbacks.calculateItems}
          />
          <ModalOverlay onModalOverlayClick={callbacks.onEntryCart} />
        </>
      )}
    </PageLayout>
  );
}

export default App;
