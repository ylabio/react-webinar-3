import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart/index.js';
import Modal from './components/modal/index.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const listCart = store.getState().listCart;

  const totalCart = store.getState().totalCart;

  const visibleModals = store.getState().visibleModals;

  const callbacks = {
    onAddItemCart: useCallback((code) => {
      store.addItemCart(code);
    }, [store]),

    deleteItemCart: useCallback((code) => {
      store.deleteItemCart(code);
    }, [store]),

    toggleVisibleModal: useCallback((visibleModal) => {
      store.toggleVisibleModal(visibleModal);
    }, [store]),

    disabledScroll: useCallback(() => {
      document.body.style.overflow = 'hidden';
    }, []),
    
    enableScroll: useCallback(() => {
      document.body.style.overflow = '';
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls 
        nameCartModal={visibleModals.cart.name}
        onShowCart={callbacks.toggleVisibleModal} 
        totalCart={totalCart} 
        disabledScroll={callbacks.disabledScroll}
      />
      <List 
        list={list}
        textButton={'Добавить'}
        onClick={callbacks.onAddItemCart}
      /> 
      <Modal 
        title={'Корзина'}
        visibleModal={visibleModals.cart}
        onHide={callbacks.toggleVisibleModal}
        enableScroll={callbacks.enableScroll}
      >  
        <Cart 
          listCart={listCart}
          totalPrice={totalCart.totalPrice}
          visibleCartModal={visibleModals.cart.visible} 
          onClick={callbacks.deleteItemCart}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
