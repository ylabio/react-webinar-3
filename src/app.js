import React, { useCallback, useEffect } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

import "./style.css";
import Item from "./components/item";
import BasketItem from "./components/basket-item";
import Results from "./components/results";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { modalOpenStatus, list, basket, basketAmount } = store.getState();

  const callbacks = {
    onAddItem: useCallback(
      (item) => {
        store.addItemToBasket(item);
      },
      [store]
    ),
    onDeleteItemFromBasket: useCallback(
      (id) => {
        store.deleteItemFromBasket(id);
      },
      [store]
    ),
    onToggle: useCallback(
      (status) => {
        store.setModalOpenStatus(status);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        basketAmount={basketAmount}
        onToggle={callbacks.onToggle}
        basket={basket}
      />
      <List list={list} handler={callbacks.onAddItem} Component={Item} />

      <Modal
        basket={basket}
        openStatus={modalOpenStatus}
        onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}
        onToggle={callbacks.onToggle}
        head={
          <Head title="Корзина">
            <button onClick={() => callbacks.onToggle(false)}>Закрыть</button>
          </Head>
        }
      >
        {/* Сделал компонент корзины, чтобы не писать 
        стили в глобальный файл. Также для однообразия */}
        <Basket
          onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}
          basket={basket}
        />

        {/* TODO: разобраться с margin */}
        <Results basketAmount={basketAmount} />
      </Modal>
    </PageLayout>
  );
}

export default App;
