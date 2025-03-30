import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import Cart from './components/cart';
import CartTotal from './components/cart-total';
import Item from './components/item';
import ItemCart from "./components/item-cart/index";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const { fullAmount, amountOfProducts } = store.date;
  const [modal, setModal] = useState(false);


  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onAddToCart: useCallback(
      (obj) => {
        store.addToCart(obj);
      },
      [store]
    ),
    onDeleteItemFromCart: useCallback(
      (code) => {
        store.deleteItemCart(code);
      },
      [store]
    ),
  };

  return (
    <>
    <PageLayout>
    <Head title="Магазин" />
    <Cart cart={cart} setVisible={setModal}  fullAmount={fullAmount} amountOfProducts={amountOfProducts} />
    <List
      list={list}
      renderItem={(item)=>{return (
      <Item
       item={item}
       onDeleteItem={callbacks.onDeleteItem} 
       onAddToCart={callbacks.onAddToCart}
      />
    )}}
    /> 
  </PageLayout>
  <ModalLayout visible={modal} title={'Корзина'} setVisible={setModal}>
    <List list={cart}
    renderItem={(item)=>{return (
      <ItemCart
       item={item}
       onDeleteItem={callbacks.onDeleteItemFromCart} 
      />
    )}}
     />
    <CartTotal
      subtitle='Корзина пустая...'
      fullAmount={fullAmount}
      amountOfProducts={amountOfProducts}
    />
  </ModalLayout>
</>
  );
}

export default App;