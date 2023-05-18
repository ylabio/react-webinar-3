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

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onAddToCart: (item) => {
      store.addToCart(item)
    },
    onGetCartInfo: () => {
      store.getCartInfo()
    },
    onOpenModal: () => {

      setIsOpenModal(!isOpenModal);

    },
  }
  console.log(isOpenModal)
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
            onSelectItem={callbacks.onSelectItem}
            onAddToCart ={callbacks.onAddToCart}
            onGetCartInfo = {callbacks.onGetCartInfo}
      />
    </PageLayout>
  );
}

export default App;
