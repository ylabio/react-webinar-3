import React, { useCallback, useState } from 'react';
import List from './components/list';
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
  const { list, cart } = store.getState();

  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onClickCart: useCallback(() => {
      setCartOpen(!isCartOpen);
    }, [isCartOpen]),

    onDeleteItemFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
  };

  const cartSummary = React.useMemo(() => {
    return cart.reduce(
      (summary, item) => {
        summary.totalCount += item.count;
        summary.totalPrice += item.price * item.count;
        return summary;
      },
      { totalCount: 0, totalPrice: 0 }
    );
  }, [cart]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cartSummary={cartSummary} onClick={callbacks.onClickCart} />
      <List
        list={list}
        onClick={callbacks.onAddItemToCart}
        buttonText='Добавить'
        buttonStyle='primary'
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
