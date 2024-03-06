import React, { useCallback } from "react";
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
  const [count, setCount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const list = store.getState().list;
  const cartlist = store.getState().cartlist;

  const callbacks = {
    selectItem: (ele, quantity) => {
      setPrice(price + ele.price);
      if (!quantity) {
        setCount(count + 1);
      }
      store.addItem(ele, quantity);
    },

    onAddItem: useCallback(() => {
      setModalVisible(true);
      store.modal();
    }, [store]),

    onDeleteItem: (ele) => {
      setPrice(price - ele.price * ele.quantity);
      setCount(count - 1);
      store.deleteItem(ele);
    },
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls count={count} price={price} onAdd={callbacks.onAddItem} />
      <List list={list} selectItem={callbacks.selectItem} />
      {modalVisible && (
        <Modal setModalVisible={setModalVisible} title="Корзина">
          <Cart
            list={cartlist}
            onDeleteItem={callbacks.onDeleteItem}
            price={price}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
