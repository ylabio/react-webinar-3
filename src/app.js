import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from './components/modal-layout';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModal, setIsModal] = useState(false)

  const list = store.getState().list;
  const basket = store.getState().basket
  const totalSum = store.getState().total ?? 0
  const amountOfItems = store.getState().amount ?? 0
  
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
    onModal: () => {
      setIsModal(prev => !prev)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls amount={amountOfItems} totalSum={totalSum} onModal={callbacks.onModal}/>
      <List list={list}
            onClick={callbacks.onClick}
            isInBasket={false}/>
      { isModal && 
      <ModalLayout>
        <Basket basket={basket} totalSum={totalSum} onClick={callbacks.onDeleteItem} onModal={callbacks.onModal}/>
      </ModalLayout>
      }
    </PageLayout>
  );
}
// <Modal basket={basket} totalSum={totalSum} onClick={callbacks.onDeleteItem} onModal={callbacks.onModal}/>
export default App;
