import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Total from "./components/total";
import Item from "./components/item";
import Basket from "./components/basket";

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

  function renderItemButton(item) {
    const itemCallbacks = {
      onAddItem: () => {
        callbacks.onAddItem(item);
      },
    };
    return <button onClick={itemCallbacks.onAddItem}>Добавить</button>;
  }

  function renderList(list) {
    return list.map((item) => (
      <div key={item.code} className="List-item">
        <Item item={item} renderButton={renderItemButton} />
      </div>
    ));
  }

  return (
    <PageLayout>
      <Head title="Магазин" />

      <Controls onAction={callbacks.onShowCart} action="Перейти">
        <Total pcs={uniqueItems} sum={totalSum} />
      </Controls>

      <Basket
        cart={cart}
        onClose={callbacks.onCloseModal}
        isShown={modalIsShown}
        onDeleteItem={callbacks.onDeleteItem}
      />

      <List list={list} renderList={renderList} />
    </PageLayout>
  );
}

export default App;
