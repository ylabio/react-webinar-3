import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalCart from './components/modalCart';
import Modal from './components/modal';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart = [], cartCount = 0, cartTotal = 0 } = store.getState(); // Добавляем корзину в состояние
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const [_, forceUpdate] = useState(0);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate(prev => prev + 1);
    });
    return () => unsubscribe();
  }, [store]);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback(item => store.addToCart(item), [store]),

    onRemoveFromCart: useCallback(code => store.removeFromCart(code), [store]),

    onToggleModal: useCallback(() => {
      setIsModalOpen(!isModalOpen);
    }, [isModalOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cartCount={cartCount} cartPrice={cartTotal} onCartClick={callbacks.onToggleModal} />
      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onSelectItem={callbacks.onSelectItem}
        onAddToCart={callbacks.onAddToCart}
      />
      {isModalOpen && (
        <ModalCart
          cart={cart}
          onClose={callbacks.onToggleModal}
          onRemoveFromCart={callbacks.onRemoveFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
