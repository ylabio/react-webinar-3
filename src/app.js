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
  const { list, cartItems, totalPrice } = store.getState();
  const [cartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.removeItemFromCart(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store]
    ),
  };

  return (
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          items={cartItems}
          setCartOpen={setCartOpen}
          totalPrice={totalPrice}
        />
        {cartOpen && (
          <CartModal
            cartOpen={setCartOpen}
            totalPrice={totalPrice}
            onDeleteItem={callbacks.onDeleteItem}
            cartItems={cartItems}
          />
      )}
        <List list={list} onAddItem={callbacks.onAddItem} />
      </PageLayout>
  );
}

export default App;
