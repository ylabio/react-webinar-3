import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Controls from './components/controls';
import Cart from './components/cart';
import { getTotalCost } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, count, sum } = store.getState();
  const [isOpenCart, setIsOpenCart] = useState(false);

  const callbacks = {
    onAddCartItem: useCallback(
      (code) => {
        store.addCartItem(code);
      },
      [store]
    ),
    onDeleteCartItem: useCallback(
      (code) => {
        store.deleteCartItem(code);
      },
      [store]
    ),
    openModal: useCallback(() => setIsOpenCart(true), []),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls openModal={callbacks.openModal} count={count} sum={sum} />
      <List
        list={list}
        onClick={callbacks.onAddCartItem}
        buttonTitle={'Добавить'}
      />
      {isOpenCart && (
        <Cart
          cart={cart}
          onCloseCart={() => setIsOpenCart(false)}
          onDeleteCartItem={callbacks.onDeleteCartItem}
          totalCost={sum}
        />
      )}
    </PageLayout>
  );
}

export default App;
