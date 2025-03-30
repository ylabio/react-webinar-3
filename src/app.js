import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import Item from './components/item';
import ItemCart from './components/item-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const sum = store.getState().sum;

  const [isOpenModal, setOpenModal] = useState(false);

  const cartListLength = cartList.length;

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = e => {
    e.stopPropagation();
    setOpenModal(false);
  };

  const callbacks = {
    onAddItemToCartList: useCallback(
      item => {
        store.addItemToCartList(item);
      },
      [store],
    ),

    onDeleteItemFromCartList: useCallback(
      code => {
        store.deleteItemFromCartList(code);
      },
      [store],
    ),
  };

  const render = {
    item: useCallback(item => {
      return <Item item={item} onAddItemToCartList={callbacks.onAddItemToCartList} />;
    }, []),
    itemCart: useCallback(item => {
      return <ItemCart item={item} onDeleteItemFromCartList={callbacks.onDeleteItemFromCartList} />;
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cartListLength={cartListLength} sum={sum} openModal={openModal} />
      <List list={list} renderItem={render.item} />

      {isOpenModal && (
        <ModalLayout title={'Корзина'} closeModal={closeModal} sum={sum}>
          <List list={cartList} renderItem={render.itemCart} />
        </ModalLayout>
      )}
    </PageLayout>
  );
}

export default App;
