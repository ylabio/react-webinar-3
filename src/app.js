import React, { useCallback, useState } from 'react';
import List from './components/list';
import Item from './components/item';
import CartItem from './components/cartItem';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, totalQuantity, totalPrice } = store.getState();

  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onOpen: useCallback(() => {
      setIsOpen(true);
    }, [isOpen]),

    onClose: useCallback(() => {
      setIsOpen(false);
    }, [isOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpen={callbacks.onOpen} quantity={totalQuantity} totalPrice={totalPrice} />
      <List
        items={list}
        empty="Список товаров пуст"
        renderItem={item => <Item item={item} onAddItem={callbacks.onAddItem} />}
      />
      <Modal isOpen={isOpen} onClose={callbacks.onClose} title="Корзина" totalPrice={totalPrice}>
        <List
          items={cart}
          empty="Корзина пуста"
          renderItem={item => <CartItem item={item} onDeleteItem={callbacks.onDeleteItem} />}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
