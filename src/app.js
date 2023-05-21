import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalActive, setIsActiveModal] = useState(false);

  const list = store.getState().list;

  const basket = store.getState().basket;

  const totalPrice = store.getState().totalPrice;

  const totalItems = store.getState().totalItems;

  const callbacks = {
    onAddItemToBasket: useCallback((item) => {
      store.addItemToBasket(item);
    }, [store]),
    
    onDeleteItemFromBasket: useCallback((item) => {
      store.deleteItemFromBasket(item);
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalPrice={totalPrice} totalItems={totalItems} onOpenBasket={setIsActiveModal} />
      <List list={list}
        onAddItemToBasket={callbacks.onAddItemToBasket}
      />
      {isModalActive && (
        <Basket
          basket={basket}
          onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}
          onCloseBasket={setIsActiveModal}
          totalPrice={totalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;
