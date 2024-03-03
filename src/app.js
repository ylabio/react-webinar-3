import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartControls from './components/cart-controls';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const isModalOpen = store.getState().isModalOpen;

  const list = store.getState().list;
  const cartList = store.getState().cartList;

  const totalCartPrice = cartList.reduce((total, item) => total + item.price * item.quantity, 0);

  const callbacks = {
    onOpenModalCart: useCallback(() => {
      store.openModal();
    }, [store]),

    onCloseModalCart: useCallback(() => {
      store.closeModal();
    }, [store]),

    onAddCartItem: useCallback((code) => {
      store.addCartItem(code);
    }, [store]),

    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartControls onOpenModalCart={callbacks.onOpenModalCart} amountCart={cartList.length} totalCartPrice={totalCartPrice}/>
      <List 
          list={list}
          onAddCartItem={callbacks.onAddCartItem}
      />
      {isModalOpen && <Cart list={cartList} onClose={callbacks.onCloseModalCart} onDeleteCartItem={callbacks.onDeleteCartItem} totalCartPrice={totalCartPrice}/>}
    </PageLayout>
  );
}

export default App;
