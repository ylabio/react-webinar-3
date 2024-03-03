import React, { useState, useCallback } from "react";
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
function App({ store }) {
  const list = store.getState().list;
  const initialBucket = {
    itemsList: [],
    uniqueItems: 0,
    totalPrice: 0,
  };

  const [bucket, setBucket] = useState(initialBucket);
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

    onBucketAdd: useCallback((item) => {
      setBucket((prev) => {
        const alreadyAdded = prev.itemsList.find(
          (obj) => obj.code === item.code
        );

        if (alreadyAdded) {
          alreadyAdded.amount = alreadyAdded.amount + 1;
          return {
            ...prev,
            itemsList: [...prev.itemsList],
            totalPrice: prev.totalPrice + item.price,
          };
        } else {
          return {
            ...prev,
            itemsList: [...prev.itemsList, { ...item, amount: 1 }],
            uniqueItems: prev.uniqueItems + 1,
            totalPrice: prev.totalPrice + item.price,
          };
        }
      });
    }, []),

    onBucketRemove: useCallback((item) => {
      setBucket((prev) => {
        const newBucketList = prev.itemsList.filter(
          (elem) => !(elem.code === item.code)
        );
        return {
          ...prev,
          itemsList: newBucketList,
          uniqueItems: prev.uniqueItems - 1,
          totalPrice: prev.totalPrice - item.price * item.amount,
        };
      });
    }, []),
  };

  return (
    <>
      {showModal ? (
        <Modal
          data={bucket}
          onModalClose={callbacks.onModalClose}
          onBucketAction={callbacks.onBucketRemove}
        />
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
          theme="shop"
          list={list}
          onDeleteItem={callbacks.onDeleteItem}
          onSelectItem={callbacks.onSelectItem}
          onBucketAction={callbacks.onBucketAdd}
        />
      </PageLayout>
    </>
  );
}

export default App;
