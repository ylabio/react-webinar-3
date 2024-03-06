import React, {useCallback, useMemo, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ProductsBasket from './components/products_basket'
import PageOutBasket from './components/page-out-basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
const [basketOpen,setBasketOpen]=useState(false)
useMemo(()=>{
  store.getLocalStorage()
},[])

  const list = store.getState();
  const listBasket=store.getBasketList()

  const callbacks = {
    onAddBasket: useCallback((code)=>{
      store.addItemBasket(code);
    },[store]),
  
    onDeleteBasketItem: useCallback((code)=>{
      return store.deleteBasketItem(code);
    },[store]),
  }
 
  basketOpen && (document.querySelector('body').style.overflow='hidden')
  return (
    <div>
      <PageLayout  list={list} onAddBasket={callbacks.onAddBasket} setBasketOpen={setBasketOpen} />
    {basketOpen && <PageOutBasket onDeleteBasketItem={callbacks.onDeleteBasketItem}   list={listBasket}
    setBasketOpen={setBasketOpen} />}
   
    </div>
    
  );
}

export default App;
