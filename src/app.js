import React, {useCallback, useState} from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from "./components/CartModal/CartModal";
import Cart from "./components/Cart/Cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isCartOpen, setIsCartOpen] = useState(false);

  const items = Object.keys(cart).length;
  const price = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openCart = () => {
    setIsCartOpen(true);
  };

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
      <Head title={"Магазин"}/>
      <Cart totalItems={items} totalPrice={price} onOpenCart={openCart} />
      <List list={list} onAddToCart={callbacks.onAddToCart}/>
      {isCartOpen && (
        <CartModal
          cart={cart}
          onRemoveFromCart={callbacks.onRemoveFromCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </PageLayout>
  );
}

export default App;
