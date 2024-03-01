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

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteFromBasket(item);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addIntoBasket(item);
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
                      <List list={list}
                            showBasket={showBasket}
                            removeItems={callbacks.onDeleteItem}/>
                      <BasketFooter basketCounter={callbacks.onCountBasket()} />
                    </BasketLayout> 
                  : <></> }
    </>
  );
}

export default App;
