import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Cart from './components/cart';
import CartInfo from "./components/cart-info";
import Button from "./components/button"
import Item from "./components/item"

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

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls>
        <CartInfo cart={cart}/>
        <Button onClick={callbacks.onCartModalOpen}>Перейти</Button>
      </Controls>
      <List
        list={list}
        renderItem={Item}
        itemProps={{
          onAddToCart: callbacks.onAddItemToCart
        }}
      />
      <Modal isOpen={isCartModalOpen}>
        <Cart
          cart={cart}
          onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
          handleCartModalClose={callbacks.onCartModalClose}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
