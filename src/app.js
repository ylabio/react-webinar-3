import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isCartOpen } = store.getState();

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddCart: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddCart: useCallback(
      item => {
        store.addItemCart(item);
      },
      [store],
    ),

    openModal: useCallback(() => {
      store.openModal();
    }, [store]),

    closeModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} onOpen={callbacks.openModal} />
      <List
        list={list}
        onAddCart={callbacks.onAddCart}
        onDeleteItem={callbacks.onDeleteItem}
        onSelectItem={callbacks.onSelectItem}
      />
      {isCartOpen && (
        <Cart data={cart} onClose={callbacks.closeModal} onDeleteItem={callbacks.onDeleteItem} />
      )}
    </PageLayout>
  );
}

export default App;
