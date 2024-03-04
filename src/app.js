import React, {useCallback, useState} from 'react';
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

  const list = store.getState().list;
  const uniqueProductsCount = store.getState().uniqueProductsCount;
  const totalPrice = store.getState().price;

  const [modalActive, setActive] = useState(true);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenModal={setActive} uniqueProductsCount={uniqueProductsCount.size} totalPrice={totalPrice}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}
            onSelectItem={callbacks.onSelectItem}/>
      <Modal active={modalActive} setActive={setActive}/>
    </PageLayout>
  );
}

export default App;
