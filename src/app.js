import React, {useCallback} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ShoppingCart from "./components/shopping-cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const {cartTotalInfo} = store.getState();

  const callbacks = {
    onAddProductToCart: useCallback(
      (code) => {
        store.addProductToCart(code);
      },
      [store]
    ),

    onDeleteProductFromCart: useCallback(
      (code) => {
        store.removeProductFromCart(code);
      },
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls cartTotalInfo={cartTotalInfo} onOpenModal={() => setModalVisible(true)} />
        <List
          items={list}
          renderItem={(item) => (
            <Item
              key={item.code}
              item={item}
              buttonName="Добавить"
              onHandleClick={callbacks.onAddProductToCart}
            />
          )}
        />
      </PageLayout>
      <Modal visible={modalVisible} setVisible={() => setModalVisible(false)}>
        <ShoppingCart
          onDeleteProductFromCart={callbacks.onDeleteProductFromCart}
          cart={cart}
          totalPrice={cartTotalInfo?.totalPrice}
          setVisible={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
}

export default App;
