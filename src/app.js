import React, { useCallback, useState } from 'react';
import List from './components/list';
import Item from './components/item';
import Modal from './components/modal';
import Cart from './components/cart';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, cartSummary } = store.getState();

  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onClickCart: useCallback(() => {
      setCartOpen(!isCartOpen);
    }, [isCartOpen]),

    onDeleteItemFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [cart],
    ),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [cart]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cartSummary={cartSummary} onClick={callbacks.onClickCart} />
      <List
        items={list}
        renderItem={item => <Item item={item} onAdd={callbacks.onAddItemToCart} />}
      />
      <Modal
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        children={<Cart cart={cart} cartSummary={cartSummary} onRemove={callbacks.onDeleteItemFromCart} />}
      />
    </PageLayout>
  );
}

export default App;
