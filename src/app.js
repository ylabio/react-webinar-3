import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const sumFromCart = store.getState().sumFromCart;

  const [isShow, setIsShow] = useState(false)

  const toggleShow = () => {
    setIsShow((show) => !show)
  }
  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, []),
    onRemoveToCart: useCallback((code) => {
      store.removeItem(code)
    },[])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls {...{sumFromCart, toggleShow}} count={cart.length}/>
      <List {...{list, cart}} onAddToCart={callbacks.onAddToCart}/>
      {isShow && 
        <Cart {...{cart, setIsShow, isShow}}  onRemoveToCart={callbacks.onRemoveToCart}/>
      }
    </PageLayout>
  );
}

export default App;
