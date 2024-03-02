import React, { useCallback, useState, useEffect } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartLayout from './components/cart-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isCartOpen, setIsCartOpen] = useState(false)

  const list = store.getState().list;
  const itemsCount = store.getState().itemsCount;
  const sum = store.getState().sum;
  const cartList = store.getState().cartList;

  const callbacks = {
    onAddToCart: useCallback(code => {
      store.addToCart(code);
    }, [store]),
    onDeleteFromCart: useCallback(code => {
      store.deleteFromCart(code)
    }, [store]),
    onShowCart: useCallback(() => {
      setIsCartOpen(true)
    }, []),
    onCloseCart: useCallback(() => {
      setIsCartOpen(false)
    }, [])
  }

  useEffect(() => {
    if (itemsCount === 0) {
      setIsCartOpen(false)
    }
  }, [itemsCount])

  return (
    <PageLayout>
      <Head title={'Магазин'}/>
      <Controls controls={true} itemsCount={itemsCount} sum={sum} onShowCart={callbacks.onShowCart}/>
      <List list={list} showAmount={false} actionBtn={'Добавить'} isCartOpen={isCartOpen} addToCart={callbacks.onAddToCart}/>
      
      {isCartOpen &&
        <CartLayout onCloseCart={callbacks.onCloseCart} sum={sum}>
          <Head title={'Корзина'} isCartOpen={isCartOpen} onCloseCart={callbacks.onCloseCart}/>
          <Controls controls={false} />
          <List list={cartList} showAmount={true} priceStyle={{marginRight: '3.875rem'}} style={{borderTop: '1px dashed #ccc'}} actionBtn={'Удалить'} isCartOpen={isCartOpen} deleteFromCart={callbacks.onDeleteFromCart}/>
        </CartLayout>
      }
    </PageLayout>
  );
}

export default App;
