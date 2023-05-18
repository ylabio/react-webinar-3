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

  const list = store.getState().list;
  const [modalOpened, setModalOpened] = useState(false);

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

  }

  return (<PageLayout>
    <Head title='Приложение на чистом JS'/>
    <Controls onModalOpen={() => setModalOpened(true)}/>
    <List list={list}
          onAddItem={callbacks.onAddItem} />
    <Modal modalOpened={modalOpened} setModalOpened={() => setModalOpened(false)}>
      <List list={list}
            onAddItem={callbacks.onAddItem} cartMode />
    </Modal>
  </PageLayout>);
}

export default App;
