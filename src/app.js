import React, {useCallback} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cartData = store.getCartState();

  const callbacks = {
    onDeleteItemFromCart: useCallback(
      itemCode => {
        store.deleteItemFromCart(itemCode);
      },
      [store],
    ),
    onAddItemToCart: useCallback(
      itemCode => {
        store.addItemToCart(itemCode);
      },
      [store],
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="магазин"/>
        <Controls
          onAdd={() => {
            console.log("ddd");
          }}
          productCount={cartData.list.length}
          totalPrice={cartData.totalPrice}
        />
        <List list={list} isCartList={false} onClickItem={callbacks.onAddItemToCart}/>
      </PageLayout>
      <Modal>
        <Cart totalPrice={cartData.totalPrice}>
          <Head title="корзина" styleClass="cart"/>
          <List list={cartData.list} isCartList={true} onClickItem={callbacks.onDeleteItemFromCart}/>
        </Cart>
      </Modal>
    </>
  );
}

export default App;
