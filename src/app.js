import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, totalPrice } = store.getState();

  const [cartIsOpen, setCartIsOpen] = useState(false);

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
      <Modal isOpen={cartIsOpen} closeModal={callbacks.toggleCart}>
        <Cart
          cart={cart}
          totalPrice={totalPrice}
          removeItem={callbacks.deleteFromCart}
        />
      </Modal>
    </>
  );
}

export default App;
