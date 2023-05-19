import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Popup } from './components/popup';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [active, setActive] = useState(false)
  const [basket, setBasket] = useState([])

  console.log('basket', basket)
  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    /* onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]), */

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls setActive={setActive}/>
      {active && <Popup active={active} setActive={setActive} basket={basket}/>}
      <List list={list}
            setBasket={setBasket}/>
    </PageLayout>
  );
}

export default App;
