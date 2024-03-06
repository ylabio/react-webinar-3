import React, {useCallback} from 'react';
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import ListPage from './components/list-page';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const toggleModal = store.toggleModal;
  const pricesSum = store.getPricesSum();

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <ListPage list={list}
            cartList={cartList} pricesSum={pricesSum}
            onAddItemToCart={callbacks.onAddItemToCart}
            toggleModal={toggleModal}/>
      <Cart id='cart' cartList={cartList} pricesSum={pricesSum} onDeleteItem={callbacks.onDeleteItem} toggleModal={toggleModal}></Cart>
    </PageLayout>
  );
}

export default App;
