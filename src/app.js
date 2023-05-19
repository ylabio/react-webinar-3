import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCount = cart.items.reduce((acc, curr) => acc + curr.count, 0);
  const totalPrice = cart.items.reduce((acc, curr) => acc + curr.count * curr.price, 0);

  const callbacks = {
    onToggleCartView: useCallback(() => {
      store.toggleCartView();
    }, [store]),

    onAddToCart: useCallback((item) => {
      store.addToCart(item);
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
      {cart.isOpen && <Cart list={cart.items} onToggleCartView={callbacks.onToggleCartView} onDeleteCartItem={callbacks.onDeleteCartItem} totalPrice={totalPrice}/>}
    </PageLayout>
  );
}

export default App;
