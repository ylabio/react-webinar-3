import React, {useCallback, useMemo, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ProductsBasket from './components/products_basket'
import PageOutBasket from './components/page-out-basket';
import Modal from './components/modal'

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
 
  basketOpen ? (document.querySelector('body').style.overflow='hidden'):(document.querySelector('body').style.overflow='auto')
  return (
    <div>
      <PageLayout  list={list} onAddBasket={callbacks.onAddBasket} setBasketOpen={setBasketOpen} />
    {basketOpen && <Modal setBasketOpen={setBasketOpen}> 
   <Head title='Корзина'><Controls name='Закрыть' onButton={()=>setBasketOpen(false)}/></Head>
   <PageOutBasket onDeleteBasketItem={callbacks.onDeleteBasketItem}   list={listBasket}
    /></Modal> }
  
    </div>
    
  );
}

export default App;
