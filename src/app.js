import React, {useCallback} from 'react';
import { formatPrice } from './utils';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/ui/modal';
import Cart from './components/cart';
import ProductItem from './components/product-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cartList = store.getState().cart;
  const isModalOpen = store.getState().isModalOpen;

  const totalAmount = cartList.length;
  const totalSum =
    formatPrice(cartList.reduce((sum, item) => sum += item.amount * item.price, 0))

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),

    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls totalAmount={totalAmount} totalSum={totalSum} onOpenModal={callbacks.onOpenModal}/>
        <List 
          list={list}
          renderItem={(item) => <ProductItem item={item} onAddItemToCart={callbacks.onAddItemToCart} />}
        />
      </PageLayout>
      <Modal isModalOpen={isModalOpen} >
        <Cart 
          list={cartList} 
          totalSum={totalSum} 
          onCloseModal={callbacks.onCloseModal} 
          onDeleteItemFromCart={callbacks.onDeleteItemFromCart} 
        />
      </Modal>
    </>
  );
}

export default App;
