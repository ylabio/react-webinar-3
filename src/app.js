import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
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
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
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
        <Modal onClose={callbacks.onToggleModal}>
          <h2>Корзина</h2>
          {cart.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.code} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.title}</span>
                    <span className="cart-item-quantity">{item.quantity} шт</span>
                    <span className="cart-item-price">{item.price * item.quantity} ₽</span>
                    <button
                      className="cart-item-remove"
                      onClick={() => callbacks.onRemoveFromCart(item.code)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <span className="cart-total-left">Итого:</span>{' '}
                <span className="cart-total-right">
                  {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽
                </span>
              </div>
            </div>
          )}
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
