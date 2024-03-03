import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [count, setCount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const list = store.getState().list;
  const cartlist = store.getState().cartlist;

  const callbacks = {
    selectItem: (ele, quantity) => {
      setPrice(price + ele.price);
      setCount(count + 1);
      store.addItem(ele, quantity);
    },

    onAddItem: useCallback(() => {
      store.modal();
    }, [store]),

    onDeleteItem: (ele) => {
      setPrice(price - ele.price * ele.quantity);
      setCount(count - 1 * ele.quantity);
      store.deleteItem(ele);
    },
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls count={count} price={price} onAdd={callbacks.onAddItem} />
      <List list={list} selectItem={callbacks.selectItem} />
      <Cart
        list={cartlist}
        onDeleteItem={callbacks.onDeleteItem}
        price={price}
      />
    </PageLayout>
  );
}

export default App;
