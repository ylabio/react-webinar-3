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
  const toggleCart = () => {
    const cart = document.querySelector('.Cart-cart-content ');
    const backdrop = document.querySelector('.Cart-modal-backdrop');
    cart.classList.toggle('visible');
    backdrop.classList.toggle('hidden');
  }

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
      <Head title='Приложение на чистом JS'/>
      <List list={list}
            cartList={cartList}
            onAddItemToCart={callbacks.onAddItemToCart}
            toggleCart={toggleCart}/>
      <Cart id='cart' cartList={cartList} onDeleteItem={callbacks.onDeleteItem} toggleCart={toggleCart}></Cart>
    </PageLayout>
  );
}

export default App;
