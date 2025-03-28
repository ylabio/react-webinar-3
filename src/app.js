import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cartModal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const state = store.getState();

  const handleAddToCart = useCallback(
    (code, quantity) => {
      store.addToCart(code, quantity);
    },
    [store],
  );

  const handleRemoveFromCart = useCallback(
    code => {
      store.removeFromCart(code);
    },
    [store],
  );

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartItemsCount={cartItemsCount}
        cartTotalPrice={cartTotalPrice}
        onOpenCart={() => store.toggleModal()}
      />
      <List list={list} onCartButtonClick={handleAddToCart} isCart={false} />
      {state.isModalOpen && (
        <CartModal
          cart={state.cart}
          onClose={() => store.toggleModal()}
          onRemoveItem={handleRemoveFromCart}
          totalPrice={cartTotalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;
