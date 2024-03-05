import React, { useCallback } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartRow from './components/cartRow';
import Modal from './components/modal';
import Cart from './components/cart';
import shopItem from './components/shopItem';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, cart, cartSum, isOpenModal } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),

    onOpenModal: useCallback(() => {
      store.setIsOpenModal(true);
    }, [store]),

    onCloseModal: useCallback(() => {
      store.setIsOpenModal(false);
    }, [store])
  }

  return (
    <PageLayout>
      <Modal isOpenModal={isOpenModal}>
        <Head title='Корзина'
          btn={{
            title: 'Закрыть',
            callback: callbacks.onCloseModal
          }}
        />
        <Cart cart={cart}
          cartSum={cartSum}
          btn={{
            title: 'Удалить',
            callback: callbacks.onDeleteFromCart
          }}
        />
      </Modal>
      <Head title='Магазин' />
      <CartRow cart={cart}
        cartSum={cartSum}
        btn={{
          title: 'Перейти',
          callback: callbacks.onOpenModal
        }}
      />
      <List list={list}
        Item={shopItem}
        btn={{
          title: 'Добавить',
          callback: callbacks.onAddToCart
        }}
      />
    </PageLayout>
  );
}

export default App;
