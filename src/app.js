import React, { useCallback, useState } from 'react';
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
  const list = store.getState().list;

  const [showCart, setShowCart] = useState(false)

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.onAddToCart(code);
      },
      [store],
    ),
    onDeleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code)
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls setShowCart={setShowCart} list={list.filter(item => item.count ? true : false)} />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
      {showCart ? <Cart list={list.filter(item => item.count ? true : false)} setShowCart={setShowCart} onDeleteFromCart={callbacks.onDeleteFromCart} /> : ''}
    </PageLayout>
  );
}

export default App;
