import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const isModalVisible = store.getState().isModalVisible;

  const callbacks = {
    onDeleteFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),

    onAddToCart: useCallback((code) => {
      store.addItemInCart(code);
    }, [store]),

    onCartClick: useCallback(() => {
      store.cartClick();
    }, [store])
  };

  const cartList = list.filter(item => item.cartCount > 0);
  const cartCount = cartList.length;
  const cartSum = cartList.reduce((curSum, item) => curSum + item.cartCount * item.price, 0)

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onCartClick={callbacks.onCartClick} cartCount={cartCount} cartSum={cartSum} />
      <List
        list={list}
        onAddItem={callbacks.onAddToCart}
      />
      <Modal onCartClick={callbacks.onCartClick} isVisible={isModalVisible}>
        <List
          list={cartList}
          onDeleteItem={callbacks.onDeleteFromCart}
          isCart={true}
        />
        <Item isCart={true} isSumItem={true} cartSum={cartSum}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
