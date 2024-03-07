import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';
import { calcItems } from './utils';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const modalIsActive = store.getState().modalIsActive;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    toggleModal: useCallback(() => {
      document.body.classList.toggle('modal-open');
      store.toggleModal();
    }, [store]),
  }

  return (
    <>
      <Basket modalIsActive={modalIsActive}
              list={list}
              toggleModal={callbacks.toggleModal}
              onDeleteItem={callbacks.onDeleteItem}/>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls calcText={calcItems(list)} text="Перейти" action={callbacks.toggleModal}/>
        <List list={list}
              actionItem={callbacks.onAddItem}
              buttonText="Добавить"/>
      </PageLayout>
    </>
    
  );
}

export default App;
