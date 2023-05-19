import React, {useCallback} from 'react';
import PageLayout from './components/page-layout';
import Head from './components/head';
import HeaderCart from './components/header-cart';
import List from './components/list';
import Cart from './components/cart';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list,
        cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code)
    }, [store]),
    onToggleCart: useCallback(() => {
      store.toggleCartModal()
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <HeaderCart cart={cart} onToggleCart={callbacks.onToggleCart}/>
      <List list={list} onAddToCart={callbacks.onAddToCart}/>
      {cart.isCartOpen && <ModalLayout title='Корзина' onToggleModal={callbacks.onToggleCart}><Cart cart={cart} onDeleteFromCart={callbacks.onDeleteFromCart} /></ModalLayout>}
    </PageLayout>
  );
}

export default App;
