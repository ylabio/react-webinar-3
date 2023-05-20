import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartList = store.getState().cartList;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onGoToCart: useCallback(() => {
      store.goToCart();
    }, [store]),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onGo={callbacks.onGoToCart}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            onAddItemToCart={callbacks.onAddItemToCart}/>
      <Cart title='Корзина' cartList={cartList} />
    </PageLayout>
  );
}

export default App;
