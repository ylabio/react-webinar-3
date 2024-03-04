import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Popup from "./components/popup";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const modalIsOpen = store.getState().modal;

  const callbacks = {
    onDeleteBasketItem: useCallback((code) => {
      store.deleteBasketItem(code);
    }, [store]),

    onAddBasketItem: useCallback((code) => {
      store.addBasketItem(code);
    }, [store]),

    onSetActiveModal: useCallback(() => {
      store.setActiveModal();
    }, [store])
  }

  return (
    <>
      <Popup
        isOpen={modalIsOpen}
        onCloseModal={callbacks.onSetActiveModal}
      >
        <Basket
          titleModal='Корзина'
          basket={basket}
          onCloseModal={callbacks.onSetActiveModal}
          funcButton={callbacks.onDeleteBasketItem}
        />
      </Popup>
      <PageLayout>
        <Head title='Магазин' />
        <Controls
          basket={basket}
          onOpenModal={callbacks.onSetActiveModal}
        />
        <List
          list={list}
          funcButton={callbacks.onAddBasketItem}
          buttonTitle='Добавить'
        />
      </PageLayout>
    </>
  );
}

export default App;
