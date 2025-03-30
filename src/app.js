import React, { useState, useCallback, useEffect } from 'react';
import List from './components/list';
import Head from './components/head';
import CartModal from './components/cart-modal';
import PageLayout from './components/page-layout';
import CartSummary from './components/cart-summary';

function App({ store }) {
  const state = store.getState();
  const [isCartOpen, setCartOpen] = useState(false);

  const cartSummary = Object.entries(state.cart).reduce(
    (acc, [code, quantity]) => {
      const product = state.list.find(p => p.code === Number(code));
      if (product) {
        /* acc.totalItems += quantity;
        acc.totalSum += quantity * product.price; */
        acc.totalItems = Object.keys(state.cart).length; // Уникальные товары
        acc.totalSum += quantity * product.price;
      }
      return acc;
    },
    { totalItems: 0, totalSum: 0 },
  );

  const callbacks = {
    onAddToCart: useCallback(code => store.addToCart(code), [store]),
    onRemoveFromCart: useCallback(code => store.removeFromCart(code), [store]),
    onOpenCart: useCallback(() => setCartOpen(true), []),
    onCloseCart: useCallback(() => setCartOpen(false), []),
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        callbacks.onCloseCart();
      }
    };

    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, callbacks.onCloseCart]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartSummary
        itemsCount={cartSummary.totalItems}
        totalSum={cartSummary.totalSum}
        onOpenCart={callbacks.onOpenCart}
      />
      <List list={state.list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && (
        <CartModal
          cart={state.cart}
          products={state.list}
          onRemove={callbacks.onRemoveFromCart}
          onClose={callbacks.onCloseCart}
          totalSum={cartSummary.totalSum}
        />
      )}
    </PageLayout>
  );
}

export default App;
