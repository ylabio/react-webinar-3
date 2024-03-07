import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Header from './components/header';
import CartItem from './components/cart-item';
import Item from './components/item';
import Modal from './components/modal';
import CartFooter from './components/cart-footer';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const isOpenCart = store.getState().isOpenCart;
  const cart = store.getState().cart;

  const callbacks = {

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onClose: useCallback(() => {
      store.closeCart();
    }, [store]),

    onOpen: useCallback(() => {
      store.openCart();
    }, [store]),

    onDelete:  useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

  }

  const renderItem = (typeItem, item) => {
    switch (typeItem) {
      case 'CartItem': 
        return <CartItem item={item} onDelete={callbacks.onDelete}/>
      default: 
        return  <Item item={item} onAdd={callbacks.onAddItem}/>
    }
  }

  return (
    <PageLayout>
      <Header>
        <Head title='Магазин'/>
      </Header>
      <Controls onClick={callbacks.onOpen} title={'Перейти'} quantity={cart.quantity} totalSum={cart.totalSum}/>
      <List list={list} typeItem={item => renderItem('Item', item)}/>
      {isOpenCart ? (
        <Modal title={"Корзина"} onClose={callbacks.onClose}>
          <div className='Cart-list'>
            <List list={cart.list} typeItem={item => renderItem('CartItem', item)}/>
          </div>
          <CartFooter totalSum={cart.totalSum}></CartFooter>
        </Modal>
      )  : ''}
    </PageLayout>
  );
}

export default App;
