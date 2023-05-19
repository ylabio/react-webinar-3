import React, {useCallback} from 'react';
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
  const shoppingСart = store.getState().shoppingСart;
  const isRender = store.getState().shoppingСart.render;

  const callbacks = {
    addToBasket: useCallback((code) => {
      store.addToBasket(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onCloseBasket: useCallback(() => {
      store.renderBasket();
    }, [store])
  }

  const cartRendr = (ren) => {
    let cart;
    if(ren) {
      cart = <Cart onDel={callbacks.onDeleteItem} shoppingСart={shoppingСart} onCloseBasket={callbacks.onCloseBasket}/>
    } else {
      cart = ""
    }
    return cart
  }

  

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls shoppingСart={shoppingСart} onCloseBasket={callbacks.onCloseBasket}/>
      <List list={list}
            addToBasket={callbacks.addToBasket}
            />

      {cartRendr(isRender)}
      
    </PageLayout>
  );
}

export default App;
