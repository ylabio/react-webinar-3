import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import BasketLayout from "./components/basket-layout";
import Basket from "./components/basket";
import List from "./components/list";


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
    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code)
    }, []),
    onDeleteItemFromBasket: useCallback((code) => {
      store.deleteItemFromBasket(code)
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalPrice={basket.totalPrice} uniqItems={basket.uniqItems} callback={() => setShowModal(true)}
                title={'Перейти'}/>
      <List list={list}
            onAddItemToBasket={callbacks.onAddItemToBasket}/>
      {showModal &&
        <BasketLayout>
          <Head title={'Корзина'}/>
          <button onClick={() => setShowModal(false)}>Закрыть</button>
          <Basket showModal basket={basket} onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}/>
        </BasketLayout>}
    </PageLayout>
  );
}

export default App;
