import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const [ cart, setCart ] = useState(new Map());

  const callbacks = {
    onAddItem: item => {
      const newMap = new Map(cart);
      newMap.set(item, newMap.has(item) ? newMap.get(item) + 1 : 1);
      console.log(newMap)
      setCart(newMap);
    },
    onRemoveItem: item => {
      const newMap = new Map(cart);
      newMap.get(item) > 1 ? newMap.set(item, newMap.get(item) - 1) : newMap.delete(item);
      setCart(newMap);
    },
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} onRemoveItem={callbacks.onRemoveItem}/>
      <List list={list}
            onAddItem={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
