import React, {useCallback, useState, createContext} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const [modalOpened, setModalOpened] = useState(false);

  /** Контекст для передачи в дочерние компоненты */
  const ContextContainer = createContext(null);

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
  }

  return (<PageLayout>
    <Head title='Магазин'/>
    <Controls onModalOpen={() => setModalOpened(true)} cart={cart}/>
    <List list={list}
          onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
    <Modal modalOpened={modalOpened} setModalOpened={() => setModalOpened(false)}>
      {/* Контекст для передачи в дочерние элементы */}
      <ContextContainer.Provider value={{cart}}>
        <List list={cart}
              onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem} cartMode/>
      </ContextContainer.Provider>
    </Modal>
  </PageLayout>);
}

export default App;
