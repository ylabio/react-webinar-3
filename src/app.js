import React, { useCallback } from 'react';
import { createElement } from './utils.js';
import List from './components/list/index.js';
import Controls from './components/controls/index.js';
import Head from './components/head/index.js';
import PageLayout from './components/page-layout/index.js';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState(); 

  const onDeleteItem = useCallback((code) => {
    store.deleteItem(code);
  }, [store]);

  const onAddItem = useCallback((code) => {
    store.addItem(code);
  }, [store]);

  return (
      <PageLayout>
        <Head title="Магазин" />
        <Controls cart={cart} onDeleteItem={onDeleteItem}/>
        <List list={list} onAddItem={onAddItem} />
      </PageLayout>
  );
}

export default App;