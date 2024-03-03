import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart/index.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const listCart = store.getState().listCart;

  const totalCart = store.getState().totalCart;

  const activeCart = store.getState().activeCart;

  const callbacks = {
    onAddItemCart: useCallback((code) => {
      store.addItemCart(code);
    }, [store]),

    deleteItemCart: useCallback((code) => {
      store.deleteItemCart(code);
    }, [store]),

    onShowCart: useCallback((code) => {
      store.showCart();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onShowCart={callbacks.onShowCart} totalCart={totalCart}/>
      <List list={list}
            textButton={'Добавить'}
            onClick={callbacks.onAddItemCart}/> 
      <Cart listCart={listCart}
        totalPrice={totalCart.totalPrice}
        activeCart={activeCart} 
        onShowCart={callbacks.onShowCart}
        onClick={callbacks.deleteItemCart}/>
    </PageLayout>
  );
}

export default App;
