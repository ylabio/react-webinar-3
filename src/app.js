import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal/index';
import Basket from './components/basket/index';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalActive, setModalActive] = useState(false);

  const list = store.getState().list;
  
  const callbacks = {
    onDeleteProduct: useCallback((product) => {
        store.deleteProduct(product);

      },
      [store]
    ),

    onAddProduct: useCallback((product) => {
        store.addProduct(product);

    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls setActive={setModalActive} productsCount={store.products.length} productsPrice={store.totalPrice}/>
        <List
          list={list}
          btnCallback={callbacks.onAddProduct}
          btnsTitle={'Добавить'}
        />
      </PageLayout>
      <Modal active={modalActive} setActive={setModalActive}><Basket list={store.products} btnCallback={callbacks.onDeleteProduct} btnsTitle={'Удалить'} setActive={setModalActive} price={store.totalPrice}></Basket></Modal>
    </>
  );
}

export default App;