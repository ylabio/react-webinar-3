import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();
  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store]
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store]
    ),

  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        setIsOpen={setIsOpen}
        totalCount={cart.items.length}
        totalPrice={cart.totalPrice}
      />
      <List
        items={list}
        onAddToCart={callbacks.onAddToCart}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Head title='Корзина' variant='modal'/>
        <Cart
          cart={cart.items}
          totalPrice={cart.totalPrice}
          onRemoveFromCart={callbacks.onRemoveFromCart}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
