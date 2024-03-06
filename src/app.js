import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal  from "./components/Modal";
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().CartList; 
  const total = store.getState().totalPrice;
  const [isActive, setIsActive] = useState(false);

  const callbacks = {
    onAddCart: useCallback(
      (item) => {
        store.addToCart(item.code);
      },
      [store]
    ),
    onDeleteItem: useCallback(
      (item) => {
        store.deleteItem(item.code);
      },
      [store]
    ),
  }
  const getItem = (item) => {
    return (<Item onAdd={callbacks.onAddCart} item={item}/>)
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls 
      setIsActive={setIsActive}
      cartList = {cart}
      totalPrice={total}/>
      <List list={list} getItem={getItem} />    
      <CartModal isActive={isActive}>
        <Cart
        list={cart}
        onSelect={callbacks.onDeleteItem}
        totalPrice={total}
        setIsActive={setIsActive}
        />
      </CartModal>   
    </PageLayout>
  );
}

export default App;
