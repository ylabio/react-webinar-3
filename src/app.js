import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Scoreboard from "./components/scoreboard";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  //  Признак активности модельного окна с корзиной
  const [isModalActive, setIsModalActive] = useState(false)

  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onShowBasket: useCallback(() => {
      setIsModalActive(true);
    }, []),
    onHideBasket: useCallback(() => {
      setIsModalActive(false);
    }, [])
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Scoreboard
              count={basket.length}
              price={basket.reduce((sum, current) => sum + current.price * current.count, 0)}
              showBasket={callbacks.onShowBasket}/>
        <List list={list}
              onAddItem={callbacks.onAddItem}/>
      </PageLayout>
      { isModalActive &&
          <Basket
              basket={basket}
              onHideBasket={callbacks.onHideBasket}
              onDeleteItem={callbacks.onDeleteItem}/>
      }
    </>
  );
}

export default App;
