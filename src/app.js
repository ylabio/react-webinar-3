import React, { useState, useCallback } from "react";
import List from "./components/list";
import Head from "./components/head";
import Cart from "./components/cart";
import PageLayout from "./components/page-layout";
import CartMenu from "./components/cart-menu";
import { monefy } from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartIsShow, setCartIsShow] = useState(false);

  const list = store.getState().list.map((product) => {
    return {
      ...product,
      count: 0,
      content: [monefy(product.price)],
    };
  });

  const callbacks = {
    onCartOpen: useCallback(() => {
      setCartIsShow(true);
      document.body.style.overflow = "hidden";
    }),
    onCartClose: useCallback(() => {
      setCartIsShow(false);
      document.body.style.overflow = "scroll";
    }),
    onAddToCart: useCallback((product) => store.addToCart(product)),
    onDeleteFromCart: useCallback((product) =>
      store.deleteFromCart(product.code)
    ),
  };

  const addToCartBtn = {
    title: "Добавить",
    onClick: callbacks.onAddToCart,
  };

  const deleteFromCartBtn = {
    title: "Удалить",
    onClick: callbacks.onDeleteFromCart,
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartMenu store={store} onCartOpen={callbacks.onCartOpen} />
        <List list={list} itemsBtn={addToCartBtn} />
      </PageLayout>
      <Cart
        store={store}
        itemBtn={deleteFromCartBtn}
        isShow={cartIsShow}
        onClose={callbacks.onCartClose}
      />
    </>
  );
}

export default App;
