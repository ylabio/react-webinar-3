import React, { useState, useCallback } from 'react';
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
  const [isCartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;

  const callbacks = {
    onOpenCart: () => setCartOpen(true),
    onCloseCart: () => setCartOpen(false),

    onAddCartItem: useCallback(
      code => {
        store.addCartItem(code);
      },
      [store]
    ),

    onDeleteCartItem: useCallback(
      code => {
        store.deleteCartItem(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls list={list} onOpenCart={callbacks.onOpenCart} />
      <List
        list={list}
        onAddCartItem={callbacks.onAddCartItem}
      />
      {isCartOpen
        ?
          <Cart 
            list={list}
            onDeleteCartItem={callbacks.onDeleteCartItem}
            isCartOpen={isCartOpen} 
            onCloseCart={callbacks.onCloseCart}
          />
        :
          <></>
      }
    </PageLayout>
  );
}

export default App;
