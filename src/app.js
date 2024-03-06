import React, {useCallback, useState} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ModalCart from "./components/modal-cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const [openModal, setOpenModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onOpenModal: () => {
      setOpenModal(true);
      document.body.style.overflow = "hidden";
    },

    onCloseModal: () => {
      setOpenModal(false);
      document.body.style.overflow = "auto";
    },
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onAdd={callbacks.onOpenModal} store={store} />
        <List list={list}
              onClick={callbacks.onAddItem} btnName={"Добавить"} cart={false} />
      </PageLayout>
      {openModal && (
        <Modal title={"Корзина"} closeModal={callbacks.onCloseModal}>
          <ModalCart  store={store}
                     onClick={callbacks.onDeleteItem} />
        </Modal>
      )
      }
    </>
  );
}

export default App;
