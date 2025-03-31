// app.js
import React from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalWindow from './components/modalWindow/index';
import CartButton from './components/cartButton/index';
import  Item from './components/item';

function App({ store }) {
  const { list, cart, cartSummary } = store.getState(); // Изменили cartTotal на cartSummary
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const callbacks = {
    onAddToCart: React.useCallback(
      code => store.addToCart(code),
      [store]
    ),
    onRemoveFromCart: React.useCallback(
      code => store.removeFromCart(code),
      [store]
    ),
    onToggleCart: React.useCallback(
      () => setIsCartOpen(!isCartOpen),
      [isCartOpen]
    )
  };

  const cartItems = Object.entries(cart).map(([code, quantity]) => {
    const item = list.find(item => item.code === Number(code));
    return { ...item, quantity };
  });

  return (
    <PageLayout>
      <Head title="Магазин" />

      <div className="cart-button-container">
        <CartButton
          totalItems={cartSummary.uniqueItemsCount} // Используем uniqueItemsCount для шапки
          totalAmount={cartSummary.totalAmount}     // Используем totalAmount для суммы
          onClick={callbacks.onToggleCart}
        />
      </div>

      <List
        list={list}
        renderItem={(item) => (
          <Item
            item={item}
            onAddToCart={callbacks.onAddToCart}
          />
        )}
      />

      {isCartOpen && (
        <ModalWindow onClose={callbacks.onToggleCart}>
          <Cart
            items={cartItems}
            totalAmount={cartSummary.totalAmount}     // Используем totalAmount для корзины
            totalQuantity={cartSummary.totalQuantity} // Добавляем totalQuantity для корзины
            onClose={callbacks.onToggleCart}
            onRemove={callbacks.onRemoveFromCart}
          />
        </ModalWindow>
      )}
    </PageLayout>
  );
}

export default App;
