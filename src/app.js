import React, {useCallback, useState} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ModalStore from "./components/modal-store";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const storeList = store.getState().storeList;
  const [openModal, setOpenModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store])
    onOpenModal: () => {
      setOpenModal(true);
    },

    onCloseModal: () => {
      setOpenModal(false);
    },
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onAdd={callbacks.onOpenModal} />
        <List list={list}
              onClick={callbacks.onAddItem} btnName={'Добавить'}/>
      </PageLayout>
      {openModal && (
        <Modal closeModal={callbacks.onCloseModal}>
           <ModalStore closeModal={callbacks.onCloseModal} list={storeList}
                       onClick={callbacks.onDeleteItem} />
        </Modal>
      )
      }
    </>
  );
}

export default App;
