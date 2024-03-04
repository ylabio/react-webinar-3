import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Info from './components/info';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const products = store.getState().products;
  const active = store.getState().active;
  const totalPrice = store.getState().totalPrice;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddToCartItem: useCallback((code) => {
      store.addToCartItem(code);
    }, [store]),
    
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Info 
        products={products}
        totalPrice={totalPrice}
      >
        <Controls 
          onOpenModal={callbacks.onOpenModal}
        />
      </Info>
      <List 
        list={list}
        products={products}
        onAddToCartItem={callbacks.onAddToCartItem}
        active={active}
      />
      <Modal 
        active={active}
        products={products}
        onDeleteItem={callbacks.onDeleteItem}
        onCloseModal={callbacks.onCloseModal}
        totalPrice={totalPrice}
      />
    </PageLayout>
  );
}

export default App;
