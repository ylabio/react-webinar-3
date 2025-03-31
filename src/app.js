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
  const { list, cart = [] } = store.getState(); // Добавляем корзину в состояние
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

    onAddToCart: useCallback(
      item => {
        const currentState = store.getState();
        const existingItem = currentState.cart.find(cartItem => cartItem.code === item.code);

        store.setState({
          ...currentState,
          cart: existingItem
            ? currentState.cart.map(cartItem =>
                cartItem.code === item.code
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              )
            : [...currentState.cart, { ...item, quantity: 1 }],
        });
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.setState({
          ...store.getState(),
          cart: (store.getState().cart || []).filter(item => item.code !== code),
        });
      },
      [store],
    ),

    onToggleModal: useCallback(() => {
      setIsModalOpen(!isModalOpen);
    }, [isModalOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartCount={cart.length}
        cartPrice={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onCartClick={callbacks.onToggleModal}
      />
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
