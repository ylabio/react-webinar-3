import React, { useCallback, useMemo, useRef } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import  CartIcon  from 'assets/cart-icon.svg'
import { plural } from './utils';
import CartModal from './components/cart-modal';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  
  const quantity = useMemo ( ()=> list.reduce((acc, cur) => acc + cur.quantity, 0));
  const allPrice = useMemo ( ()=> list.reduce((acc, cur) => acc + cur.quantity * cur.price, 0));

  const modalRef = useRef();

  const callbacks = {
    // onDeleteItem: useCallback(
    //   code => {
    //     store.deleteItem(code);
    //   },
    //   [store],
    // ),

    // onSelectItem: useCallback(
    //   code => {
    //     store.selectItem(code);
    //   },
    //   [store],
    // ),

    onAddItemtoCart: useCallback(
      code => {
        store.addItemtoCart(code);
      },
      [store],
    ),
    onDeleteItemfromCart: useCallback(
      code => {
        store.deleteItemfromCart(code);
      },
      [store],
    ),
    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),
  };

  return (
    <PageLayout>
      <CartModal quantity={quantity} allPrice={allPrice} onDeleteItemfromCart={callbacks.onDeleteItemfromCart} list={list} ref={modalRef}/>
      <Head title="Магазин" />
      <Controls handleClick={()=>{modalRef.current.open()}}  styles="Controls-cart button" 
      title={quantity > 0  ? `${quantity} ${plural(quantity, { one: 'товар', few: 'товара',many: 'товаров',})} / ${allPrice} ₽` : 'Пусто'}>
        <CartIcon/></Controls>
      <List
        list={list}
        onAddItemtoCart={callbacks.onAddItemtoCart}
      />
    </PageLayout>
  );
}

export default App;
