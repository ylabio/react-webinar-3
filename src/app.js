import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { Cart } from './components/cart';
import { Modal } from './components/modal';
import { ModalHeader } from './components/modal-header';
import { CartInfo } from './components/cart-info';
import Item from './components/item';
import { ModalItem } from './modal-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalShown, setIsModalShown] = useState(false);

  const { list, cart, cartItemsCount, cartTotalPrice } = store.getState();

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
      <List Component={Item} list={list} onButtonClick={callbacks.onAddItem} />
      {isModalShown && (
        <Modal>
          <ModalHeader onShowModal={callbacks.onToggleModal} />
          <List Component={ModalItem} list={cart} onButtonClick={callbacks.onDeleteItem} />
          <CartInfo price={cartTotalPrice} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
