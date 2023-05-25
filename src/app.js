import React, { useCallback, useState, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/Modal';
import Cart from './components/cart';
import Item from './components/item';
import CartItem from './components/cartItem';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const totalAmount = store.getState().totalAmount;
  const countOfUniqueProducts = store.getState().countOfUniqueProducts;
  const cartList = store.getState().cartList;

  const [modal, setModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store],
    ),
    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store],
    ),
    increaseCount: useCallback(
      (code) => {
        store.increaseCount(code);
      },
      [store],
    ),

    removeItem: useCallback((code) => store.deleteItem(code), [store]),
  };

  const renders = {
    renderCatalogItem: useCallback(
      (item) => (
        <Item item={item} addItem={callbacks.addItem} increaseCount={callbacks.increaseCount} />
      ),
      [callbacks.increaseCount],
    ),
    renderCartItem: useCallback(
      (item) => <CartItem item={item} deleteItem={callbacks.removeItem} />,
      [callbacks.increaseCount],
    ),
  };

  return (
    <>
      <Modal visible={modal} setVisible={setModal}>
        <Cart
          renderItem={renders.renderCartItem}
          visible={modal}
          setVisible={setModal}
          products={cartList}
          totalAmount={totalAmount}
        />
      </Modal>
      <PageLayout>
        <Head title='Приложение на чистом JS' />
        <Controls
          setVisible={setModal}
          increaseCount={countOfUniqueProducts}
          totalAmount={totalAmount}
        />
        <List list={list} renderItem={renders.renderCatalogItem} />
      </PageLayout>
    </>
  );
}
export default App;
