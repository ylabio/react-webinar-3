import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Cartclose from './components/cartclose';
import Carthead from './components/carthead';
import Cartlist from './components/cartlist';
import Carttotal from './components/carttotal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const totalPrice = store.getTotalPrice();
  const filteredList = list.filter(({count}) => count ? true : false)

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
      <Controls setShowCart={setShowCart} count={filteredList.length} totalPrice={totalPrice} />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
      {showCart ?
        <Cart>
            <Cartclose setShowCart={setShowCart} />
            <Carthead title={'Корзина'} />
            <Cartlist list={filteredList} onDeleteFromCart={callbacks.onDeleteFromCart} />
            <Carttotal totalPrice={totalPrice} />
        </Cart>
        : ''}
    </PageLayout>
  );
}

export default App;
