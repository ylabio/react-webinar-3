import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';
import CatalogItem from './components/item/catalog-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  // const list = store.getState().list;
  const { list, totalPrice } = store.getState();
  const cart = store.getCart();

  const [isCartOpen, setCartOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        console.log('Добавлен товар по коду:', code);
        store.addToCart(code);
      },
      [store],
    ),
    onOpenCart: () => setCartOpen(true),
    onCloseCart: () => setCartOpen(false),
    onRemoveFromCart: code => store.removeFromCart(code),
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
        renderItem={item => <CatalogItem item={item} onAdd={callbacks.onAddToCart} />}
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
