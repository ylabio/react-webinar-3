import React, { useState, useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ModalFooter from "./components/modal-footer";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalActive, setModalActive] = useState(false);

  const list = store.getState().list;
  const state = store.getState();

  const totalPrice = store.getState().totalPrice;
  const totalCount = store
    .getState()
    .cart.reduce((sum, item) => sum + item.count, 0);

  const callbacks = {
    onModalActive: useCallback(
      (modal) => {
        setModalActive(modal);
      },
      [modalActive]
    ),

    onDeleteItemFromCard: useCallback(
      (code) => {
        store.deleteItemFromCard(code);
      },
      [store]
    ),

    onAddItemToCart: useCallback(
      (item) => {
        store.addItemToCart(item);
      },
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" cartComponent={false} />
        <Controls
          totalCount={totalCount}
          totalPrice={totalPrice}
          cartComponent={false}
          onModalActive={callbacks.onModalActive}
        />
        <List
          list={list}
          cartComponent={false}
          onAddItemToCart={callbacks.onAddItemToCart}
        />
      </PageLayout>
      <Modal active={modalActive} setActive={setModalActive}>
        <Head
          title={"Корзина"}
          cartComponent={true}
          onModalActive={callbacks.onModalActive}
        ></Head>
        <Controls onAdd={callbacks.onAddItem} cartComponent={true} />
        <List
          list={state.cart}
          cartComponent={true}
          onDeleteItemFromCard={callbacks.onDeleteItemFromCard}
        />
        <ModalFooter totalPrice={totalPrice} />
      </Modal>
    </>
  );
}

export default App;
