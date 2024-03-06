import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Item from './components/item';
import ModalLayout from './components/modal-layout';
import ModalItem from './components/modal-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setisModalOpen] = useState(false); 

  const list = store.getState().list;
  const cardInfo = store.getState().cardInfo;

  const callbacks = {
    onAddItemToCard: useCallback((code) => {
      store.addItemToCard(code);
    }, [store]),

    removeItemFromCard : useCallback((code) => {
      store.removeItemFromCard(code);
    },[store]),

    openModal :useCallback(() => {
      console.log("openmodal")
      setisModalOpen(true);
    },[store]),

    closeModal: useCallback(() => {
      setisModalOpen(false);
    },[store]),
  }
  
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cardInfo ={cardInfo} openModalCallback = {callbacks.openModal}/>
      <List list={list} onButtonClickHandler={callbacks.onAddItemToCard} itemButtonContent = "Добавить"
          itemChildren = {<Item/>}
      />
      <ModalLayout isOpen = {isModalOpen} onClose = {callbacks.closeModal} totalCost = {cardInfo.cardTotalCost}>
          <List list = {cardInfo.cardList} onButtonClickHandler = {callbacks.removeItemFromCard} itemChildren ={<ModalItem/>}/>
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
