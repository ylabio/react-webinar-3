import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [showModal, setShowModal] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartSum = store.getCartSum();

  const callbacks = {
    getCartSum: useCallback(() => {
      store.getCartSum()
    }, [store]),

    addToCart: useCallback((newItem) => {
      store.addToCart(newItem)
    }, [store]),

    removeFromCart: useCallback((code) => {
      store.removeFromCart(code)
    }, [store]),
  }

  return (
    <>
      {showModal &&
        <Modal >
          <Cart
            cart={cart}
            cartSum={cartSum.sum}
            onRemoveItem={callbacks.removeFromCart}
            onShowModal={setShowModal}
          />
        </Modal>
      }
      <PageLayout>
        <Head title='Магазин'/>
        <Controls cartSum={cartSum} onShowModal={setShowModal}/>
        <List 
          list={list}
          makeItem={(item) => <Item item={item} onClick={callbacks.addToCart}/>}
        />
      </PageLayout>
    </>
  );
}

export default App;
