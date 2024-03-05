import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import BasketLayout from './components/basket-layout';
import BasketFooter from './components/basket-footer';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showBasket, setShowBasket] = useState(false);
  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteFromBasket(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addIntoBasket(code);
    }, [store]),

    onShowBasket: useCallback(() => {
      setShowBasket(!showBasket)
    }, [showBasket]),

    onCountBasket: useCallback(() => {
      return store.countBasket()
    }, [store]),
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls basketCounter={callbacks.onCountBasket()} onShowBasket={callbacks.onShowBasket}/>
        <List list={list}
              addItem={callbacks.onAddItem}
              basketCounter={callbacks.onCountBasket()}/>
      </PageLayout>
      {showBasket ? <BasketLayout>
                      <Head title='Корзина' isBasketHead={true} showBasket={callbacks.onShowBasket} />
                      <Controls isBasketControls={true}/>
                      <List list={basket}
                            removeItems={callbacks.onDeleteItem}/>
                      <BasketFooter basketCounter={callbacks.onCountBasket()} />
                    </BasketLayout> 
                  : <></> }
    </>
  );
}

export default App;
