import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalAmount = store.getCartAmount();
  const cartQuantity = store.getCartQuantity();

  const callbacks = {
    onAddItem: useCallback((item) => {
        store.addItemToCart(item);
    }, [store]),
    onDeleteItem: useCallback((item) => {
        store.deleteItemFromCart(item);
    }, [store]),
    toggleModal: useCallback(() => {
      setIsModalOpen(prevState => !prevState);
    }, [setIsModalOpen]),
  }
  
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls toggleModal={callbacks.toggleModal} cartQuantity={cartQuantity} totalAmount={totalAmount}/>
      <List list={list}
            onAction={callbacks.onAddItem}
            actionText={'Добавить'}
      />
      {isModalOpen && 
        <Modal 
          list={list} 
          cart={cart} 
          totalAmount={totalAmount} 
          onAction={callbacks.onDeleteItem} 
          toggleModal={callbacks.toggleModal}/>
      }
    </PageLayout>
  );
}

export default App;
