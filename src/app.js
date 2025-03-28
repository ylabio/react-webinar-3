import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { Cart } from './components/cart';
import { Modal } from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalShown, setIsModalShown] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartItemsCount = cart.length;
  const cartTotalPrice = cart.reduce((acc, { price, quantity }) => {
    acc += price * quantity;
    return acc;
  }, 0);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onToggleModal: useCallback(() => {
      setIsModalShown(prev => !prev);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        totalPrice={cartTotalPrice}
        itemsCount={cartItemsCount}
        onShowModal={callbacks.onToggleModal}
      />
      <List list={list} onButtonClick={callbacks.onAddItem} isCartMode={false} />
      {isModalShown && (
        <Modal
          cart={cart}
          totalPrice={cartTotalPrice}
          onShowModal={callbacks.onToggleModal}
          onDeleteItem={callbacks.onDeleteItem}
        />
      )}
    </PageLayout>
  );
}

export default App;
