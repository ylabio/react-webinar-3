import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showCart, setShowCart] = useState(false);

  const {list, cart} = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    onOpenCart: useCallback(() => {
      setShowCart(true);
      document.body.style.overflow = "hidden";
    }),

    onCloseCart: useCallback(() => {
      setShowCart(false);
      document.body.style.overflow = "scroll";
    }),
  }

  return (
    <PageLayout>
      {showCart &&
        <Modal title='Корзина' onClose={callbacks.onCloseCart}>
          <Cart cart={cart}
            onRemove={callbacks.onRemoveFromCart} />
        </Modal>}
      <Head title='Магазин' />
      <Controls cart={cart}
        onClick={callbacks.onOpenCart} />
      <List list={list}
        onClick={callbacks.onAddToCart}
        buttonTitle='Добавить' />
    </PageLayout>
  );
}

export default App;
