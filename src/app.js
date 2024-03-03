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

  const list = store.getState().list;
  const listBasket=store.getBasketList()

  const callbacks = {
    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onAddBasket: useCallback((code)=>{
      store.addItemBasket(code);
    },[store]),
    onTotalPrice: useCallback(()=>{
      store.totalPrice();
    },[store]),
    onGetTotalAmount: useCallback(()=>{
     return store.getTotalAmount();
    },[store]),
    onGetTotalCount: useCallback(()=>{
      return store.getTotalCount();
    },[store]),
    onDeleteBasketItem: useCallback((code)=>{
      return store.deleteBasketItem(code);
    },[store]),
   
  }

  return (
    <div>
      <PageLayout>
      <Head title='Магазин'/>
  
      <ProductsBasket 
      onTotalPrice={callbacks.onTotalPrice}
      onGetTotalAmount={callbacks.onGetTotalAmount}
      onGetTotalCount={callbacks.onGetTotalCount}
      >
        <Controls onButton={()=>setBasketOpen(true)} name='Перейти' />
      </ProductsBasket>
      <List list={list}
            onAddBasket={callbacks.onAddBasket}
         />
    </PageLayout>
    {basketOpen? <PageOutBasket onGetTotalAmount={callbacks.onGetTotalAmount}
    setBasketOpen={setBasketOpen}>
      <Head title='Корзина'><Controls onButton={()=>setBasketOpen(false)} name='Закрыть'/></Head>
      <List list={listBasket} onDeleteBasketItem={callbacks.onDeleteBasketItem} />
    </PageOutBasket>:''}
   
    </div>
    
  );
}

export default App;
