import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Summary from './components/summary';
import Cart from './components/cart';
import Item from './components/item';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, totalCount, totalPrice, modal } = store.getState();

  return (
    <>
      {modal && (
        <Modal title='Корзина'>
          <Cart />
        </Modal>
      )}
      <PageLayout>
        <Head title='Магазин' />
        <Summary totalCount={totalCount} totalPrice={totalPrice}>
          <Controls />
        </Summary>
        <List list={list}>{(props) => <Item item={{ ...props }} />}</List>
      </PageLayout>
    </>
  );
}

export default App;
