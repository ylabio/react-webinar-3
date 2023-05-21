import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import item from './components/item';
import itemCart from './components/item-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const listCart = store.getState().listCart;
  const totalCount = store.totalCount;
  const totalPrice = store.totalPrice;
  const [isModalShow, setIsModalShow] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
        store.addToCart(code);
      },
      [store]
    ),
    onDeleteFromCart: useCallback((code) => {
        store.deleteFromCart(code);
      },
      [store]
    ),

    onSwitchModal: useCallback(() => {
      setIsModalShow((prevShow) => !prevShow);
    }, [store]),
  };

  return (
    <>    
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onCartOpen={callbacks.onSwitchModal}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
      <List
        list={list}
        onActionItem={callbacks.onAddToCart}
        listItem={item}
      />
    </PageLayout>      
    <Modal
        isShow={isModalShow}
        onClose={callbacks.onSwitchModal}
        title="Корзина"
      >
        <Cart
          list={listCart}
          onAction={callbacks.onDeleteFromCart}
          totalPrice={totalPrice}
        />
      </Modal>
    </>

  );
}

export default App;
