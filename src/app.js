import React, {useCallback} from 'react';
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
    const isModalOpen = store.getState().isModalOpen;
    const callbacks = {
        addToBasketItem: useCallback((code) => {
            store.addToBasketItem(code);
        }, [store]),

        goToBasketItem: useCallback(() => {
            store.goToBasketItem();
        }, []),

        closeModal: useCallback(() => {
            store.closeModal();
        }, []),

        deleteItem: useCallback((code) => {
            store.deleteItem(code);
        }, [store]),
    }

  return (
      <PageLayout>
          <Head title='Магазин'/>
          <Controls goToBasket={() => store.goToBasketItem()} getBasket={() => store.getBasket()} place = 'catalog'/>
          <List list={list} addToBasketItem={callbacks.addToBasketItem} getBasket={() => store.getBasket()} place = 'catalog'/>
          {isModalOpen && <Modal onClose={callbacks.closeModal} deleteItem={callbacks.deleteItem} getBasket={() => store.getBasket()}/>}
      </PageLayout>
  );
}

export default App;
