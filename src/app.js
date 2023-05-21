import React, { useCallback, useState } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Label from "./components/label";
import Cart from "./components/cart";
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalProduct = store.getState().totalProduct;
  const cartSum = store.getState().cartSum;
  const [openModal, setOpenModal] = useState(false);
  const callbacks = {
    onShow: useCallback(() => {
      setOpenModal(!openModal);
    }, [openModal]),
    onDeleteCartItem: useCallback(
      (item) => {
        store.deleteItemFromCart(item);
      },
      [store]
    ),
    onAddCartItem: useCallback(
      (item) => {
        store.addItemToCart(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Label number={totalProduct} sum={cartSum} onShow={callbacks.onShow} />
      {openModal && (
        <Cart
          onClose={callbacks.onShow}
          cart={cart}
          onDeleteCartItem={callbacks.onDeleteCartItem}
          cartSum={cartSum}
        />
      )}
      <List list={list} onAddCartItem={callbacks.onAddCartItem} />
    </PageLayout>
  );
}

export default App;
