import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModal, setIsModal] = useState(false)

  const list = store.getState().list;
  const basket = store.getState().basket
  
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onClick: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onModal: useCallback(() => {
      setIsModal(prev => !prev)
    }, [isModal])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls basket={basket} onModal={callbacks.onModal}/>
      <List list={list}
            onClick={callbacks.onClick}
            isInBasket={false}/>
      { isModal && <Modal basket={basket} onDelete={callbacks.onDeleteItem} onModal={callbacks.onModal}/>}
    </PageLayout>
  );
}

export default App;
