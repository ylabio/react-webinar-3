import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, shoppingList } = store.getState();

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        list={shoppingList}>
        <List list={shoppingList} onClick={callbacks.onDeleteItem} action={"Удалить"} />
      </Controls>
      <List list={list} onClick={callbacks.onAddItem} action={"Добавить"} />
    </PageLayout>
  );
}

export default App;
