import React, { useCallback, useState, useEffect } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Button from "./components/button";
import Total from "./components/total";
import ItemList from "./components/item-list";
import ItemCart from "./components/item-cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCost = store.totalCost();
  const totalQuantity = store.totalQuantity() || 0;
  console.log(totalCost);

  useEffect(() => {
    cart.length === 0? setIsModalOpen(false) : "";
  }, [cart])

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),

    onOpenModal: useCallback(() => {
      cart.length > 0 ? setIsModalOpen(true) : "";
    }, [cart]),

    onCloseClick: useCallback(() => {
      setIsModalOpen(false);
    }, []),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          onClick={callbacks.onOpenModal}
          totalCost={totalCost}
          totalQuantity={totalQuantity}
        />
        <List
          component={ItemList}
          list={list}
          buttonTitle="Добавить"
          onDeleteItem={callbacks.onDeleteItem}
          onClick={callbacks.onAddItemToCart}
        />
      </PageLayout>
      <Modal
        isModalOpen={isModalOpen}
        children={
          <>
            <Head
              title="Корзина"
              children={
                <Button title="Закрыть" onClick={callbacks.onCloseClick} />
              }
            />
            <List
              component={ItemCart}
              list={cart}
              buttonTitle="Удалить"
              onClick={callbacks.onDeleteItemFromCart}
            />
            <Total title="Итого:" totalCost={totalCost} />
          </>
        }
      />
    </>
  );
}

export default App;
