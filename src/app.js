import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [showModal, setShowModal] = useState(false)

  const list = store.getState().list;
  const basket = store.getBasket();


  const callbacks = {
    showModal: useCallback(() => {
      setShowModal(true)
    }, [store]),
    onAddItemToBasket: useCallback((item) => {
      store.addItemToBasket(item)
    }, []),
    onDeleteItemFromBasket: useCallback((code) => {
      store.deleteItemFromBasket(code)

    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalPrice={basket.totalPrice} uniqItems={basket.uniqItems} callback={callbacks.showModal}
                title={'Перейти'}/>
      <List list={list}
            onAddItemToBasket={callbacks.onAddItemToBasket}/>
      {showModal && <Basket setShowModal={setShowModal} showModal={showModal} basket={basket} onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}/>}
    </PageLayout>
  );
}

export default App;
