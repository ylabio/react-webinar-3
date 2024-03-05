import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Overlay from './components/overlay';
import Cart from './components/cart';
import Header from './components/header';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const isOpenCart = store.getState().isOpenCart;
  const goods = store.getState().cart;

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

  return (
    <PageLayout>
      <Header>
        <Head title='Магазин'/>
      </Header>
        <Controls onClick={callbacks.onOpen} title={'Перейти'} quantity={goods.quantity} totalSum={goods.totalSum}/>
      <List list={list}
        onClick={callbacks.onAddItem}
        cart={false}
      />
      {isOpenCart ? (
        <Overlay>
          <Cart 
            onClose={callbacks.onClose} 
            goods={goods.list} 
            isOpenCart={isOpenCart} 
            cart={true} 
            onDelete={callbacks.onDelete} 
            totalSum={goods.totalSum}
          />
        </Overlay>
      )  : ''}
    </PageLayout>
  );
}

export default App;
