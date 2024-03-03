import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import GoOver from "./components/goover/"
import ShopCart from "./components/shop-cart/";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartVisible = store.getState().cartVisible;

  const callbacks = {
    onOpenCart: useCallback(() => {
      store.toggleCart(true);
    }, [store]),

    onCloseCart: useCallback(() => {
      store.toggleCart(false);
    }, [store]),

    onAddToCart: useCallback(
      (item) => {store.addItemToCart(item);
      },[store]
    ),
    deleteItemCart: useCallback(
      (item) => {store.deleteItemCart(item);
      },[store]
    ),
    totalPriceCart: useCallback(() => {
      return store.totalPrice();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <GoOver onOpen={callbacks.onOpenCart} totalItems={store.state.cartItems.length} totalPrice={store.totalPrice()}/>
      {cartVisible && (
        <ShopCart
          onClose={callbacks.onCloseCart}
          cartItems={store.getState().cartItems}
          totalPrice={callbacks.totalPriceCart}
          deleteItemCart={callbacks.deleteItemCart}
        />
      )}
      <List list={list} onAddToCart={callbacks.onAddToCart} />
    </PageLayout>
  );
}

export default App;
