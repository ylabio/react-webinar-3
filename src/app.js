import React, {useCallback,useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal/modal';
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  
  const [modalActive, setModalActive] = useState(false);
  const [cur, setCur] = useState(0);
  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls  setModalActive={setModalActive} {...cur}/>
      <List  list={list}
      
            onSelectItem={count => setCur(count)}
            onDeleteItem={callbacks.onDeleteItem}
            />
      <Modal  active={modalActive} setActive={setModalActive}/>
    </PageLayout>
  );
}

export default App;
