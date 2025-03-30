import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import Head from './components/head';
import List from './components/list/index.js';
import Item from './components/item/index.js';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback(
      id => {
        store.deleteItem(id);
      },
      [store],
    ),

    onAddItem: useCallback(
      (id, name, price) => {
        store.addItem(id, name, price);
      },
      [store],
    ),

    getItemsCount: () => {
      return store.getItemsCount();
    },

    getTotalPrice: () => {
      return store.getTotalPrice();
    },

    getCart: () => {
      return store.getCart();
    },

    onToggleCart: useCallback(
      (open) => {
        setIsCartOpen(open);
      },
      [],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        itemsCount={callbacks.getItemsCount()}
        totalPrice={callbacks.getTotalPrice()}
        cart={callbacks.getCart()}
        onDeleteItem={callbacks.onDeleteItem}
        isCartOpen={isCartOpen}
        onToggleCart={callbacks.onToggleCart}
      />
      <List
        items={list}
        renderItem={item => {
          if (!item) return null;
          return <Item item={item} onAddItem={callbacks.onAddItem} />;
        }}
      />
    </PageLayout>
  );
}

export default App;
