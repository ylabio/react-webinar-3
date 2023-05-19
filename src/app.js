import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const products = store.getState().list;
  const cart = store.getState().cart;

  const [isOpenModal, setIsOpenModal] = useState(false)

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddToCart: useCallback((item) => {
      store.addToCart(item)
    }, [store]),

    onGetCartInfo:  useCallback(() => {
      store.getCartInfo()
    },[store]),

    onOpenModal: () => {
      setIsOpenModal(!isOpenModal);
    },
  }

  return (
    <PageLayout>
      {
      isOpenModal &&
        (
          <Modal cart={cart}
          isOpenModal
          cartInfo={store.getCartInfo()}
          onGetCartInfo = {callbacks.onGetCartInfo}
          onDeleteItem={callbacks.onDeleteItem}
          onOpenModal={callbacks.onOpenModal}
          />
        )
      }
      <Head title='Магазин'/>
      <Controls cartInfo={store.getCartInfo()} onOpenModal={callbacks.onOpenModal}/>
      <List list={products}
            onDeleteItem={callbacks.onDeleteItem}
            onAddToCart ={callbacks.onAddToCart}
            onGetCartInfo = {callbacks.onGetCartInfo}
      />
    </PageLayout>
  );
}

export default App;
