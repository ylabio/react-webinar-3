import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal/index';
import Cart from './components/cart';
import CartItem from './components/cart-item';
import Item from './components/item/index'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cartCount = store.getState().count;
  const totalPrice = store.getState().totalPrice;
  const cartItems = store.getState().cartItems;
  const modal = store.getState().modal;


  const callbacks = {
    removeItemFromCart: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    openModal: useCallback(() => {
      store.openModal();
    }, []),
    closeModal: useCallback(() => {
      store.closeModal();
    }, []),
  }

  const renderItemsList = useCallback((item) => {
    return <Item item={item} onAddItem={callbacks.onAddItem} />;
  }, [callbacks.onAddItem]);

  const renderCartList = useCallback((item) => {
    return <CartItem item={item} removeItemFromCart={callbacks.removeItemFromCart} />
  }, [callbacks.removeItemFromCart]);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cartCount={cartCount} totalPrice={totalPrice} goToCart={callbacks.openModal} />
      <List list={list}
        renderItem={(item) => renderItemsList(item)} />
      {
        modal && <Modal closeModal={callbacks.closeModal} title={'Корзина'} >
          <Cart cartItems={cartItems} totalPrice={totalPrice} removeItemFromCart={callbacks.removeItemFromCart} renderCartList={renderCartList} />
        </Modal>
      }
    </PageLayout>
  );
}

export default App;
