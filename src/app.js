import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Basket from './components/basket'
import Modal from './components/modal'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const basketList = store.getState().basketList
  const basketPrice = store.getState().basketPrice
  const basketItems = store.getState().basketItems

  const [isModalActive, setModalActive] = useState(false);

  const callbacks = {
    onAddProductToBasket: useCallback(product => {
      store.addProductToBasket(product)
    }, [store]),

    onDeleteProductFromBasket: useCallback(product => {
      store.deleteProductFromBasket(product)
    }, [store]),

    onOpenBasket: useCallback(() => {
     setModalActive(true)
    }, []),

    onCloseBasket: useCallback(() => {
      setModalActive(false)
    }, [])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpenBasket={callbacks.onOpenBasket} productsInBasket={basketItems} price={basketPrice}/>
      <List
        list={list}
        onAction={callbacks.onAddProductToBasket}
      />

      {isModalActive && (
        <Modal>
          <Basket productsList={basketList} basketPrice={basketPrice} onDeleteProduct={callbacks.onDeleteProductFromBasket} onCloseBasket={callbacks.onCloseBasket}/>
        </Modal>
        )
      }        
    </PageLayout>
  );
}

export default App;
