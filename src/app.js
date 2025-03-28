import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { CartModal } from './components/cartModal';
import CartButton from './components/cartButton';
import { ModalOverlay } from './components/modalOverlay'
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isCartOpen } = store.getState();

  const callbacks = {
    onAddItemToCard: useCallback(
      code => {
        store.addToCart(code);
      },
      [store]),

    onToggleCart: useCallback(() => {
      store.toggleCart();
    }, [store]),

    onRemoveFromCart: useCallback(
      code => {
      store.removeFromCart(code);
      },
      [store]),
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0); //количество товаров
  const totalSum = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0); //сумма товаров

  return (
    <PageLayout>
      <Head
        title="Магазин"
      />
      <CartButton
        totalItems={totalItems}
        totalSum={totalSum}
        onToggleCart={callbacks.onToggleCart}
      />
      <List
        list={list}
        onAddItemToCard={callbacks.onAddItemToCard}
      />
      {isCartOpen && (
        <ModalOverlay>
          <CartModal
            cart={cart}
            onToggleCart={callbacks.onToggleCart}
            onRemoveFromCart={callbacks.onRemoveFromCart}
            totalSum={totalSum}
          />
        </ModalOverlay>
      )}
    </PageLayout>
  );
}

export default App;
