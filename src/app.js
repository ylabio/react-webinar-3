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

  const [activeBasket, setActiveBasket] = useState(false);

  const list = store.getState().list;
  const listInBasket = store.getState().listInBasket;
  const summaryPrice = store.getState().summaryPrice;
  const quantityProducts = store.getState().quantityProducts;

  const callbacks = {
    deleteFromBasket: useCallback((item) => {
      store.deleteFromBasket(item);
      store.calculateSummary();
    }, [store]),

    addToBasket: useCallback((item) => {
      store.addToBasket(item);
      store.calculateSummary();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls openBasket={setActiveBasket} quantityProducts={quantityProducts}  summaryPrice={summaryPrice}/>
      <List list={list}
            addToBasket={callbacks.addToBasket}/>
      <Basket listInBasket={listInBasket} deleteFromBasket={callbacks.deleteFromBasket} active={activeBasket} closeBasket={setActiveBasket}  summaryPrice={summaryPrice}/>
    </PageLayout>
  );
}

export default App;
