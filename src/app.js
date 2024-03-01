import React, {useCallback} from 'react';
import List from "./components/list";
import Scoreboard from "./components/scoreboard";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Scoreboard count={basket.length}/>
      <List list={list}
            onAddItem={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
