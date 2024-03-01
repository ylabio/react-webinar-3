import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Total from "./components/total";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const [modalIsShown, setModalIsShown] = useState(false);

  const uniqueItems = cart.length;
  const totalSum = cart.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  const callbacks = {
    onDeleteItem: useCallback(
      (item) => {
        store.deleteItem(item);
      },
      [store]
    ),

    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),

    onShowCart: useCallback(() => setModalIsShown(true), [modalIsShown]),

    onCloseModal: useCallback(() => setModalIsShown(false), [modalIsShown]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />

      <Controls onAction={callbacks.onShowCart} action="Перейти">
        <Total pcs={uniqueItems} sum={totalSum} />
      </Controls>

      <Modal onClose={callbacks.onCloseModal} isShown={modalIsShown}>
        <Head title="Корзина">
          <button onClick={callbacks.onCloseModal}>Закрыть</button>
        </Head>
        <Cart
          cartItems={cart}
          cartSum={totalSum}
          onDelete={callbacks.onDeleteItem}
        />
      </Modal>

      <List list={list} onAction={callbacks.onAddItem} action="Добавить" />
    </PageLayout>
  );
}

export default App;
