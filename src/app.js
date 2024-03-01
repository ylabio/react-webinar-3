import React, {useCallback, useState, useMemo} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from './components/cart'
import PageLayout from "./components/page-layout";
import {formatNumber} from './utils'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isVisible, setIsVisible] = useState(false);
  const cartQuantity = store.countItemsInCart();
  const cartTotalPrice = store.totalPriceInCart();
  const list = store.getState().list;
  const cart = store.getState().cart; 

  const pageTitle = 'Магазин';
  const actionAddItemTitle = 'Добавить';
  const actionRemoveItemTitle = 'Удалить';

  const formattedTotalPrice = useMemo(() => {
    return formatNumber(cartTotalPrice);
  }, [cartTotalPrice]);

  const callbacks = {
    addItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    removeItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store])    
  }  
 
  return (
    <PageLayout>
      <Head title={pageTitle}/>
      <Controls setIsVisible={setIsVisible} 
                cartQuantity={cartQuantity} 
                cartTotalPrice={formattedTotalPrice}/>
      <List list={list} 
            onActionType={callbacks.addItemToCart} 
            onActionTitle={actionAddItemTitle} />
      <Cart isVisible={isVisible} 
            cartTotalPrice={formattedTotalPrice} 
            cartQuantity={cartQuantity} 
            onClose={() => setIsVisible(false)}>
        <List list={cart} 
              onActionType={callbacks.removeItemFromCart} 
              onActionTitle={actionRemoveItemTitle} />
      </Cart>
    </PageLayout>
  );
}

export default App;
