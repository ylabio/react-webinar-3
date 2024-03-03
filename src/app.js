import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import './style.css';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, basketList } = store.getState();
  const [openModal, setOpenModal] = React.useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store])
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        store={store}
        openModal={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
        list={basketList}
        onAddItem={callbacks.onAddItem}
        onDeleteItem={callbacks.onDeleteItem}
      />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
        onDeleteItem={callbacks.onDeleteItem}
      />
    </PageLayout>
  );
}

export default App;
