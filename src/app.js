import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal'

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
              products={cartProducts}
              setShowModal={setShowModal}
              remove={callbacks.onRemoveFromCart}
            />
          : ''
      }
    </PageLayout>
  );
}

export default App;
