import React, { useCallback, useState } from "react";
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
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const totalPrice = store.getState().totalPrice;
  const [modalAvtive, setModalActive] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItemCart: useCallback(
      (item) => {
        store.addItemCart(item);
      },
      [store]
    ),

    //Открытие корзины
    onOpenCart: useCallback(() => {
      setModalActive(true);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onOpenCart={callbacks.onOpenCart}
        cartList={cartList}
        totalPrice={totalPrice}
      />
      <List
        list={list}
        buttonText="Добавить"
        onClick={callbacks.onAddItemCart}
      />

      <Cart
        active={modalAvtive}
        setActive={setModalActive}
        cartList={cartList}
        onDeleteItem={callbacks.onDeleteItem}
        totalPrice={totalPrice}
      />
    </PageLayout>
  );
}

export default App;
