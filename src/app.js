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

  const callbacks = {
    // onDeleteItem: useCallback((code) => {
    //   store.deleteItem(code);
    // }, [store]),

    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    countPrice: useCallback(() => {
      return store.countPrice();
    }, [store]),

    countCart: useCallback(() => {
      return store.countCart();
    }, [store]),
  };

  const totalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.count, 0)
  };

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls totalItemsInCart={totalPrice}
                list={list}
                cart={cart}/>
      <List list={list} onAddToCart={callbacks.onAddToCart}/>
    </PageLayout>
  );
}

export default App;
