import React, { useState, useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ItemShop from "./components/item-shop";
import itemBucket from "./components/item-bucket";
import Bucket from "./components/bucket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const bucket = store.getState().bucket;

  const [showModal, setShowModal] = useState(false);

  const callbacks = {
    onModalOpen: useCallback(() => {
      setShowModal(true);
    }, []),

    onModalClose: useCallback((e) => {
      if (
        e.target.id === "Modal" ||
        e.target.classList.contains("Btn-modal_close")
      ) {
        setShowModal(false);
      }
    }, []),

    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onBucketAdd: useCallback((code) => {
      store.onBucketAdd(code);
    }, []),

    onBucketRemove: useCallback((code) => {
      store.onBucketRemove(code);
    }, []),
  };

  return (
    <>
      {showModal ? (
        <Modal onModalClose={callbacks.onModalClose}>
          <Bucket
            data={bucket}
            onBucketRemove={callbacks.onBucketRemove}
            onModalClose={callbacks.onModalClose}
          />
        </Modal>
      ) : null}
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          onModalOpen={callbacks.onModalOpen}
          onAdd={callbacks.onAddItem}
          uniqueItems={bucket.uniqueItems}
          totalPrice={bucket.totalPrice}
        />
        <List
          itemType={ItemShop}
          data={list}
          onBucketAdd={callbacks.onBucketAdd}
        />
      </PageLayout>
    </>
  );
}

export default App;
