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
  // const list = store.getState().list;
  // const cart = store.getCart();
  const { list, totalPrice } = store.getState();
  const cart = store.getCart();

  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      item => {
        console.log('Добавлено в корзину:', item);
        store.addToCart(item);
      },
      [store],
    ),
    onOpenCart: () => setCartOpen(true),
    onCloseCart: () => setCartOpen(false),
    onRemoveFromCart: code => store.removeFromCart(code),
    //   onDeleteItem: useCallback(
    //     code => {
    //       store.deleteItem(code);
    //     },
    //     [store],
    //   ),
    //
    // onSelectItem: useCallback(
    //   code => {
    //     store.selectItem(code);
    //   },
    //   [store],
    // ),
    //
    //   onAddItem: useCallback(() => {
    //     store.addItem();
    //   }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        // cart={cart}
        uniqueCount={cart.length}
        totalPrice={totalPrice}
        onOpenCart={callbacks.onOpenCart}
        // onAdd={callbacks.onAddItem}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        mode="catalog"
        // onDeleteItem={callbacks.onDeleteItem}
        // onSelectItem={callbacks.onSelectItem}
      />
      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={callbacks.onCloseCart}
          onRemove={callbacks.onRemoveFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
