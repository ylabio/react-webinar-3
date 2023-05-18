import React, {useCallback , useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const totalPrice = store.getCartPrice();

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    onGoToCart: useCallback(() => {
      setIsModalOpen(true);
    }, [store]),

    onCloseCart: useCallback(() => {
      setIsModalOpen(false);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls goToCart={callbacks.onGoToCart} itemCount={cart.length} totalPrice={totalPrice}/>
      <List list={list} onAdd={callbacks.onAddItem}/>
      <Modal cart={cart} isOpen={isModalOpen} onClose={callbacks.onCloseCart} onDelete={callbacks.onDeleteItem} total={totalPrice}/>
    </PageLayout>
  );
}

export default App;
