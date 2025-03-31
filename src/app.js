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
    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
    onRemoveItem: useCallback(
      code => {
        store.removeItem(code);
      },
      [store],
    ),

    onOpenModal: useCallback(() => {
      setIsModalOpen(true);
    }, []),
    onCloseModal: useCallback(() => {
      setIsModalOpen(false);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpenModal={callbacks.onOpenModal} itemCount={itemCount} totalPrice={totalPrice} />
      <List list={list} renderItem={item => <Item item={item} onAddItem={callbacks.onAddItem} />} />
      <Modal isOpen={isModalOpen} onCloseModal={callbacks.onCloseModal} totalPrice={totalPrice}>
        <List
          list={cartItems}
          renderItem={item => <CartItem item={item} onRemoveItem={callbacks.onRemoveItem} />}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
