import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCount = cart.totalCount;
  const totalPrice = cart.totalPrice;

  const callbacks = {
    onToggleCartView: useCallback(() => {
      store.toggleCartView();
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onToggleCartView={callbacks.onToggleCartView} totalPrice={totalPrice} totalCount={totalCount} />
      <List list={list} onAddToCart={callbacks.onAddToCart}/>
      {cart.isOpen && 
        <ModalLayout>
          <Head title='Корзина' onToggleCartView={callbacks.onToggleCartView}  isCart={true}/>
          <Cart list={cart.items} onDeleteCartItem={callbacks.onDeleteCartItem} totalPrice={totalPrice}/>
        </ModalLayout>
      }
    </PageLayout>
  );
}

export default App;
