import React, { useState, useCallback } from 'react';
import List from "./components/list";
import Cart from "./components/cart";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Item from "./components/item";
import { StoreContext } from './store';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [ storeContext, setStoreContext ] = useState(store);
  const { list, showCart } = store.getState();

  const onClose = useCallback(() => {
    store.setCartVisibility(false);
  }, [store.setCartVisibility]);

  const onAddToCart = useCallback((code) => {
    store.addToCart(code);
  }, [store.addToCart]);

  return (
    <StoreContext.Provider value={[storeContext, setStoreContext]}>
    <PageLayout>
      <Modal 
        title='Корзина' 
        buttonText='Закрыть'
        show={showCart}
        onClose={onClose}
      >
        <Cart />
      </Modal>
      <Head title='Магазин'/>
      <Controls />
      <List 
        list={list} 
        onClick={onAddToCart} 
      />
    </PageLayout>
    </StoreContext.Provider>
  );
}

export default App;
