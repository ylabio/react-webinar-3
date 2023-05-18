import React, {useCallback , useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const total = store.getState().total;

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
      <Controls goToCart={callbacks.onGoToCart} itemCount={cart.length} totalPrice={total}/>
      <List list={list} onClick={callbacks.onAddItem}/>
      <Modal isOpen={isModalOpen} onClose={callbacks.onCloseCart} title="Корзина"> 
        <Cart cart={cart} onDelete={callbacks.onDeleteItem} total={total}></Cart>
      </Modal>
    </PageLayout>
  );
}

export default App;
