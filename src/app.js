import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import "./components/cart/style.css";
import ModalWindow from "./components/modal-window";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartStore = store.getState().productsIntoCart;
  const [isActiveModale, setIsActiveModale] = useState(false);

  const callbacks = {
    onAddItemIntoCart: useCallback(
      (item) => {
        store.addItemIntoCart(item);
      },
      [store]
    ),

    onDeleteItemIntoCart: useCallback(
      (item) => {
        store.deleteItemIntoCart(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        setIsActiveModale={setIsActiveModale}
        cartStore={cartStore}
        btnText={"Добавить"}
      />
      <List
        list={list}
        setIsActiveModale={setIsActiveModale}
        cartStore={cartStore}
        onAddItemIntoCart={callbacks.onAddItemIntoCart}
      />
      <ModalWindow
        isActiveModal={isActiveModale}
        setIsActiveModale={setIsActiveModale}
      >
        <Cart
          cartStore={cartStore}
          onDeleteItemIntoCart={callbacks.onDeleteItemIntoCart}
        />
      </ModalWindow>
    </PageLayout>
  );
}

export default App;
