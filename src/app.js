import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onAdd={callbacks.onAddItem} cart={cart}/>
      <List list={list}
            // onDeleteItem={callbacks.onDeleteItem}
            onAddItem={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
