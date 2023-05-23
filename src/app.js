import React, {useCallback, useState} from 'react';
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

  const {list, cart, totalCount, totalPrice} = store.getState();
  const [modalOpened, setModalOpened] = useState(false);

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
    <Controls onModalOpen={() => setModalOpened(true)} totalPrice={totalPrice} totalCount={totalCount} cart={cart}/>
    <List list={list}
          onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem}/>
    <Modal modalOpened={modalOpened} setModalOpened={() => setModalOpened(false)}>
      {/* Контекст для передачи в дочерние элементы */}
        <List list={cart}
              onAddItem={callbacks.onAddItem} onDeleteItem={callbacks.onDeleteItem} totalPrice={totalPrice} cartMode/>
    </Modal>
  </PageLayout>);
}

export default App;
