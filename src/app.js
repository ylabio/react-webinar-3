import React, { useCallback, useState } from 'react';
import List from './components/list';
import CartList from './components/cart-list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartLayout from './components/cart-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  // console.log('App')
  const list = store.getState().list;

  const [cartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls list={list} onToggleCart={() => setCartOpen(true)} />
        <List
          list={list}
          onAddItemToCart={callbacks.onAddItemToCart}
        />
      </PageLayout>
      {
        cartOpen &&
        <CartLayout
          list={list}
          onToggleCart={() => setCartOpen(false)}
        >
          <CartList
            list={list}
            onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
          >
          </CartList>
        </CartLayout>
      }
    </>
  );
}

export default App;
