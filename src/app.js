import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const items = store.getState().items;

  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls items={items} onShowCart={setIsOpen}/>
      <List list={list} onAddItem={callbacks.onAddItem}/>
       {isOpen && <Modal>
          <Cart items={items} title='Корзина' onCloseCart={setIsOpen}
          onDeleteItem={callbacks.onDeleteItem}/>
        </Modal>}
    </PageLayout>
  );
}

export default App;