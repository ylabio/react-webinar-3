import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal/index';
import Cart from './components/cart/index';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modal, setModal] = React.useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalPrice;
  const totalItem = store.getState().totalItem;

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    
    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls totalItem={totalItem} openModal={() => setModal(!modal)} totalPrice={totalPrice} />
      <List list={list} onAddItem={callbacks.onAddItem} />
      {modal && (
        <Modal>
          <Cart
            totalPrice={totalPrice}
            cart={cart}
            closeModal={() => setModal(!modal)}
            onDeleteItem={callbacks.onDeleteItem}
          ></Cart>
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
