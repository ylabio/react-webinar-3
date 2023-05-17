import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const totalPrice = store.getCartPrice();

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onGoToCart: useCallback(() => {
      console.log('open cart')
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls goToCart={callbacks.onGoToCart} itemCount={cart.length} totalPrice={totalPrice}/>
      <List list={list} onAdd={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
