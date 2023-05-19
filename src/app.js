import React, { useMemo } from "react";
import Cart from "./components/cart";
import Head from "./components/head";
import Item from "./components/item";
import List from "./components/list";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cartList, cartTotalPrice, cartTotalCount } = store.getState();

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
      <Cart
        totalCount={cartTotalCount}
        totalPrice={cartTotalPrice}
        onDeleteItem={callbacks.onDeleteItem}
        list={cartList}
      />
      <List list={list} Item={Item} onAction={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
