import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalActive, setModalActive] = useState(false);
  const list = store.getState().list;
  const productsBasket = store.getState().productsBasket;
  const productsPrice = store.getState().productsPrice;

  const formatPrice = price => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const callbacks = {
    onAddProductToBasket: useCallback(
      (code, title, price, count) => {
        store.addProductToBasket(code, title, price, count);
      },
      [store],
    ),

    onDeleteFromBasket: useCallback(
      code => {
        store.deleteProductFromBasket(code);
      },
      [store],
    ),

    onOpenModal: useCallback(() => {
      setModalActive(() => {
        return true;
      });
    }, []),

    onCloseModal: useCallback(() => {
      setModalActive(false);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        productsBasket={productsBasket}
        productsPrice={productsPrice}
        onOpenModal={callbacks.onOpenModal}
        onCloseModal={callbacks.onCloseModal}
      />
      <List
        list={list}
        formatPrice={formatPrice}
        onAddProductToBasket={callbacks.onAddProductToBasket}
      />
      <Modal
        isOpen={isModalActive}
        onClose={callbacks.onCloseModal}
        formatPrice={formatPrice}
        totalPrice={productsPrice}
      >
        <List
          list={productsBasket}
          onDeleteProduct={callbacks.onDeleteFromBasket}
          formatPrice={formatPrice}
          modal={true}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
