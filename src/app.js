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
  const { list, cart } = store.getState();

  const [cartIsOpen, setCartIsOpen] = useState(false);

  const totalPrice = cart.reduce(
    (totalPrice, item) => (totalPrice += item.price * item.count),
    0
  );

  const callbacks = {
    toggleCart: () => {
      setCartIsOpen((prevState) => !prevState);
    },
    addToCart: (item) => {
      store.addItemToCart(item);
    },
    deleteFromCart: (item) => {
      store.deleteItemFromCart(item);
    },
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          onClick={callbacks.toggleCart}
          itemsCount={cart.length}
          price={totalPrice}
        />
        <List
          list={list}
          onActionClick={callbacks.addToCart}
          actionsBtnText={"Добавить"}
        />
      </PageLayout>
      <Cart
        isOpen={cartIsOpen}
        closeCart={callbacks.toggleCart}
        cart={cart}
        totalPrice={totalPrice}
        removeItem={callbacks.deleteFromCart}
      />
    </>
  );
}

export default App;
