import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { CartIcon, CloseIcon } from './components/icons';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();
  const [isCartOpen, setIsCartOpen] = useState(false); // Признак открытия корзины

  const callbacks = {
    onAddItemToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onToggleCart: () => {
      setIsCartOpen(prev => !prev);
    },

    onRemoveItemFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),
  };

  const uniqueItemsCount = cart.length;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        icon={CartIcon}
        totalItems={uniqueItemsCount}
        totalPrice={totalPrice}
        onToggleCart={callbacks.onToggleCart}
      />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
      {isCartOpen && (
        <Modal onClose={callbacks.onToggleCart} icon={CloseIcon}>
          <Cart cart={cart} onRemoveItem={callbacks.onRemoveItemFromCart} totalPrice={totalPrice} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
