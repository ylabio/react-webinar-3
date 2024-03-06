import React, {useCallback} from 'react';
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

  const list = store.getState().list;
  const cart = store.getState().cart;
  const showCart = store.getState().showCart;
  const cost = store.getState().cost;

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    changeCartVisability: useCallback(() => {
      store.changeCartVisability();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartLayout onDeleteItem={callbacks.onDeleteItem} cost={cost} showCart={showCart} changeCartVisability={callbacks.changeCartVisability} cart={cart} />
      <Controls cart={cart} changeCartVisability={callbacks.changeCartVisability} cost={cost}/>
      <List list={list} onAddItem={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
