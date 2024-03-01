import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartInfo from './components/cart-info';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;


  function getItemsInCart(){
    const itemsInCart = list.filter(item => cart.includes(item));
    return itemsInCart;
  }

  function getTotalSumm(){
    let totalSumm = 0;
    if(cart) {
      totalSumm = cart.reduce((summ, item) => +item.price + summ, 0);
    }

    return totalSumm;
  }


  const callbacks = {
    // onDeleteItem: useCallback((code) => {
    //   store.deleteItem(code);
    // }, [store]),

    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <CartInfo count={getItemsInCart().length} totalSumm={getTotalSumm()}/>
      <Controls onAdd={callbacks.onAddItem}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}
            onSelectItem={callbacks.onSelectItem}/>
    </PageLayout>
  );
}

export default App;
