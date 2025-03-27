import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

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
      <Controls cart={cart} onClick={() => setCartModalOpen(true)} />
      <List list={list} isCartList={false} onAddItem={callbacks.onAddItem} />
      <CartModal open={cartModalOpen} setOpen={setCartModalOpen}>
        <List list={cart} isCartList={true} onDeleteItem={callbacks.onDeleteItem} />
      </CartModal>
    </PageLayout>
  );
}

export default App;
