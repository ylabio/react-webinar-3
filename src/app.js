import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Item from './components/item';
import CartItem from './components/cartItem/cartItem';

function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { list, cartItems, itemCount, totalPrice } = store.getState();

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
        renderItem={item => (
          <Item item={item} onChangeItem={code => callbacks.onChangeItem(code, 'add')} />
        )}
      />
      <Modal isOpen={isModalOpen} onClose={callbacks.closeModal} totalPrice={totalPrice}>
        <List
          list={cartItems}
          renderItem={item => (
            <CartItem item={item} onChangeItem={code => callbacks.onChangeItem(code, 'remove')} />
          )}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
