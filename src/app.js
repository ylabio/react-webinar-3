import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const [items, setItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      setItems((prev) => prev.filter((p) => p.title !== item.title))
    }, [items]),

    onAddItem: useCallback((item) => {
      setItems((prev) => [...prev, item]);
    }, [items])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls items={items} onShowCart={setIsOpen}/>
      <List list={list} onAddItem={callbacks.onAddItem}/>
      {isOpen && <Cart items={items} onCloseCart={setIsOpen}
       onDeleteItem={callbacks.onDeleteItem}/>}
    </PageLayout>
  );
}

export default App;