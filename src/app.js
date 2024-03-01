import React, {useCallback} from 'react';
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

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onAdd={null}/>
      <List list={list}/>
    </PageLayout>
  );
}

export default App;
