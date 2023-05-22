import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ShoppingCartCalc from "./components/shopping-cart-calc";
import ShoppingCart from "./components/shopping-cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const sumShoppingCart = store.getState().sumShoppingCart;
  const shoppingCartCount = store.getState().shoppingCartCount;
  const listShoppingCart = store.getState().shoppingCartArr;

  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onAddItem: useCallback(
      (code) => {
        store.addItemShoppingCart(code);
      },
      [store]
    ),
    onForward: (open) => {
      setIsOpen(open);
    },
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls setIsOpen={setIsOpen} title={"Перейти"} isOpen={isOpen} />
        <ShoppingCartCalc
          sumShoppingCart={sumShoppingCart}
          shoppingCartCount={shoppingCartCount}
        />
        <List list={list} onSmthDo={callbacks.onAddItem} btnTitle="Добавить" />

        <ShoppingCart
          list={listShoppingCart}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          store={store}
          sumShoppingCart={sumShoppingCart}
          shoppingCartCount={shoppingCartCount}
        />
      </PageLayout>
    </>
  );
}

export default App;
