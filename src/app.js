import React, {useCallback} from 'react';
import Basket from "./components/basket";
import Modal from "./components/modal";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, modal} = store.getState();
  
  const callbacks = {
    forOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    forCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls forOpen={callbacks.forOpenModal}/>
      <List list={list}/>
      <Modal state={modal} children>
        <Basket forClose={callbacks.forCloseModal}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
