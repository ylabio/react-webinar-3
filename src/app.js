import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartControls from './components/cart-controls';
import Cart from './components/cart';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const isModalOpen = store.getState().isModalOpen;

  const list = store.getState().list;
  const cartList = store.getState().cartList;

  const totalCartPrice = store.getState().totalCartPrice;

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
      {isModalOpen && 
        <Modal onClose={callbacks.onCloseModalCart}>
          <Cart list={cartList} onDeleteCartItem={callbacks.onDeleteCartItem} totalCartPrice={totalCartPrice}/>
        </Modal>    
      }
    </PageLayout>
  );
}

export default App;
