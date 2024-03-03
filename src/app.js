import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),

    onCartModalOpen: () => {
      setIsCartModalOpen(true)
    },

    onCartModalClose: () => {
      setIsCartModalOpen(false)
    }
  }

  const cartInfo = {
    count: cart.length,
    totalPrice: cart.reduce((accum, curr) => {
      return curr.price * curr.count + accum
    }, 0)
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cartInfo={cartInfo} handleCartModalOpen={callbacks.onCartModalOpen}/>
      <List
        list={list}
        onAddItemToCart={callbacks.onAddItemToCart}
      />
      <Modal isOpen={isCartModalOpen} list={cart}>
        <Cart
          list={cart}
          onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
          handleCartModalClose={callbacks.onCartModalClose}
          cartInfo={cartInfo}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
