import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartWidget from './components/cart-widget';
import Main from './components/main/main';
import Modal from './components/modal';
import Cart from './components/cart';

function App({ store }) {
  const list = store.getState().list;
  const [isCartOpen, setCartOpen] = useState(false);

  const cartItems = list.filter(item => item.inCart);
  const totalQuantity = cartItems.length;
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
  };
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Main>
        <CartWidget
          quantity={totalQuantity}
          amount={totalAmount}
          onClick={() => setCartOpen(true)}
        />
        <List list={list} onClick={callbacks.onAddToCart} buttonText="Добавить" />
      </Main>
      {isCartOpen && (
        <Modal onClose={() => setCartOpen(false)}>
          <Cart
            goodsList={cartItems}
            onClick={callbacks.onRemoveFromCart}
            quantity={totalQuantity}
            amount={totalAmount}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
