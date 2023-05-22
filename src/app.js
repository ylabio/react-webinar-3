import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isShown, setIsShown] = useState(false)

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code)
    }, [store]),
    togglePopUp: useCallback(() => {
      setIsShown(prevState => !prevState);
    }, [])
  }

  return (
    <>
      <Cart cart={cart} isShown={isShown} togglePopUp={callbacks.togglePopUp} onRemoveFromCart={callbacks.onRemoveFromCart}/>
      <PageLayout fullscreen>
        <Head title='Магазин'/>
        <Controls totalPrice={cart.totalPrice} productsCount={cart.productsCount} withButton withDescription onClick={callbacks.togglePopUp}/>
        <List list={list} elem={<Item/>} onClick={callbacks.onAddToCart}/>
      </PageLayout>
    </>
  );
}

export default App;
