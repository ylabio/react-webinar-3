import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";
import ProductList from "./components/product-list";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [cartOpen, setCartIsOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalPrice;
  const cartCount = store.getState().cartCount;

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addToCart(item);
    }, [store]),
    onDeleteFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),
    onClickOpenCart: useCallback(() => {
      setCartIsOpen(true);
    }, [setCartIsOpen]),
    onModalClose: useCallback(() => {
      setCartIsOpen(false);
    }, [setCartIsOpen])
  }

  return (
    <PageLayout>
      <CartModal
        totalPrice={totalPrice}
        onDeleteItem={callbacks.onDeleteFromCart}
        list={cart}
        isOpen={cartOpen}
        onClose={callbacks.onModalClose}
      />
      <Head title='Магазин' />
      <Controls count={cartCount} totalPrice={totalPrice} onClick={callbacks.onClickOpenCart} />
      <ProductList items={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
