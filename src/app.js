import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal'
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showModal, setShowModal] = useState(false)

  const list = store.getState().list;
  const cartProducts = store.getState().cartProducts

  const callbacks = {

    onAddToCart: useCallback((product) => {
      store.addToCart(product);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code)
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls
        setShowModal={setShowModal}
        products={cartProducts}
      />
      <List list={list}
            onAddToCart={callbacks.onAddToCart}/>
      {
        showModal 
          ? <Modal
              closeCb={() => setShowModal(false)}
              title="Корзина"
            >
              <Cart
                products={cartProducts}
                remove={callbacks.onRemoveFromCart}
              />
            </Modal>
          : ''
      }
    </PageLayout>
  );
}

export default App;
