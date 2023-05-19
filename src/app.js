import React, {useCallback} from 'react';

import Head from './components/head/index.js';
import List from './components/list/index.js';
import Controls from './components/controls/index.js';
import PageLayout from './components/page-layout/index.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

// useCallback - запоминает функцию внутри компонента

function App({store}) {

  const list = store.getState().list;

  const callbacks = {
    onDelete : useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onSelect : useCallback((code) => {
      store.selectItem(code);
    }, [store]),
    onAddItem : useCallback(() => {
      store.addItem();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS' />
      <Controls onAdd={callbacks.onAddItem} />
      <List list={list} onDelete={callbacks.onDelete} onSelect={callbacks.onSelect}/>
    </PageLayout>
  );
}

export default App;
