import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const storeContent = store.getState()
  
  const list = storeContent.list;
  const productsInCart = storeContent.productsInCart;
  const productsQuantity = storeContent.productsQuantity;
  const productsTotalAmount = storeContent.productsTotalAmount;

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),

    addToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
      setIsModalOpen={setIsModalOpen}
      productsQuantity={productsQuantity}
      productsTotalAmount={productsTotalAmount}/>
      <List
      list={list}
      buttonAction={callbacks.addToCart}
      buttonLabel={"Добавить"}/>
      {(isModalOpen) &&
      <Cart
      setIsModalOpen={setIsModalOpen}
      productsInCart={productsInCart}
      productsTotalAmount={productsTotalAmount}
      deleteItem={callbacks.onDeleteItem} />}
    </PageLayout>
  );
}

export default App;
