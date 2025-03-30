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
  const {list, cart, isViewModal} = store.getState();


  const callbacks = {
    onDeleteItemFromCart: useCallback(
      itemCode => {
        store.deleteItemFromCart(itemCode);
      },
      [store.state.cart],
    ),
    onAddItemToCart: useCallback(
      itemCode => {
        store.addItemToCart(itemCode);
      },
      [store.state.cart],
    ), onChangeViewModal: useCallback(
      () => {
        store.changeViewModal();
      },
      [store.state.isViewModal],
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="магазин"/>
        <Controls
          onChangeViewModal={callbacks.onChangeViewModal}
          productCount={cart.totalProductCount}
          totalPrice={cart.totalPrice}
        />
        <List list={list} isCartList={false} onClickItem={callbacks.onAddItemToCart}/>
      </PageLayout>
      {isViewModal ? <Modal onChangeViewModal={callbacks.onChangeViewModal}>
        <Cart totalProductCount={cart.totalProductCount} totalPrice={cart.totalPrice}>
          <Head title="корзина" styleClass="cart"/>
          <List list={cart.list} isCartList={true} onClickItem={callbacks.onDeleteItemFromCart}/>
        </Cart>
      </Modal> : null}
    </>
  );
}

export default App;
