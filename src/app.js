import React, {useCallback} from 'react';
import PageLayout from "./components/page-layout";
import Head from "./components/head";
import HeaderCart from './components/header-cart';
import List from "./components/list";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list,
        cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code)
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <HeaderCart cart={cart} onDeleteFromCart={callbacks.onDeleteFromCart} />
      <List list={list} onAddToCart={callbacks.onAddToCart}/>
    </PageLayout>
  );
}

export default App;
