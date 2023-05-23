import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { CartBlock } from './components/cart-block';
import { Cart } from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, [store])
  }

  const [isCartShow, setIsCartShow] = useState(false);

  return (
    <PageLayout>
      <Head 
        title='Магазин'
      />
      <CartBlock 
        cart={store.state.cart}
        cartItemsCount={store.state.cartItemsCount}
        cartItemsPrice={store.state.cartItemsPrice}
        setIsCartShow={setIsCartShow}
      />
      <List 
        list={list}
        onAddItem={callbacks.onAddItem}
      />
      {isCartShow && 
      <Cart 
        cart={store.state.cart}
        cartItemsPrice={store.state.cartItemsPrice}
        onDeleteItem={callbacks.onDeleteItem}
        setIsCartShow={setIsCartShow}
      />}
    </PageLayout>
  );
}

export default App;
