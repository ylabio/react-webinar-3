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
  const state = store.getState();
  const list = state.list;
  const cart = state.cart || [];
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Общая сумма корзины
  const totalSum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Количество
  const itemsCount = cart.length;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code)
    }, [store]),

    onToggleCart: useCallback(() => {
      setIsCartOpen(!isCartOpen);
    }, [isCartOpen])
  };

  return (
    <PageLayout>
      <Head title="Приложение на React" />
      <Controls
        itemsCount={itemsCount}
        totalSum={totalSum}
        onToggleCart={callbacks.onToggleCart}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={callbacks.onToggleCart}
          onRemoveFromCart={callbacks.onRemoveFromCart}
          totalSum={totalSum}
        />
      )}
    </PageLayout>
  );
}

export default App;
