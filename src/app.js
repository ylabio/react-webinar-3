import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import { useCart } from './utils';

function App({ store }) {
  const list = store.getState().list;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, itemCount, totalPrice } = useCart(store);

  const callbacks = {
    onChangeItem: useCallback(
      (code, action) => {
        store.changeItem(code, action);
      },
      [store],
    ),

    openModal: useCallback(() => {
      setIsModalOpen(true);
    }, []),

    closeModal: useCallback(() => {
      setIsModalOpen(false);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpenModal={callbacks.openModal} itemCount={itemCount} totalPrice={totalPrice} />
      <List
        list={list}
        onChangeItem={code => callbacks.onChangeItem(code, 'add')}
        isInCart={false}
      />
      <Modal isOpen={isModalOpen} onClose={callbacks.closeModal} totalPrice={totalPrice}>
        <List
          list={cartItems}
          onChangeItem={code => callbacks.onChangeItem(code, 'remove')}
          isInCart={true}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
