import React, { useCallback, useMemo, useState } from "react";
import Controls from "./components/controls";
import Head from "./components/head";
import List from "./components/list";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const {list, cartList} = store.getState();

  const callbacks = useMemo(
    () => ({
      onAddItem: (code) => {
        store.addCartItem(code);
      },
      onDeleteItem: (code) => {
        store.deleteCartItem(code);
      },
    }),
    [store]
  );

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Cart onDeleteItem={callbacks.onDeleteItem} list={cartList} />
      <List
        list={list}
        onAction={callbacks.onAddItem}
        actionTitle={"Добавить"}
      />
    </PageLayout>
  );
}

export default App;
