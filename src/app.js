import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';
import Item from './components/item';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const isCartOpen = store.getState().isCartOpen;
  const cartTotal = store.getState().cartTotal;
  const cartItems = store.getState().cartItems;

  const callbacks = {
    // Добавление в корзину
    onAddToCart: useCallback(
      (item) => {
        store.addItemToCart(item);
      },
      [store]
    ),

    // Открытие модального кона
    onOpenCart: useCallback(() => {
      store.setCartOpen();
    }, [store]),

    // Удаление item из корзины
    onClearItem: useCallback(
      (item) => {
        store.clearItemFromCart(item);
      },
      [store]
    ),

    // Закрытие модального окна
    onCloseCart: useCallback(() => {
      store.setCartClose();
    }, [store]),
  };

  const render = (item) => {
    return <Item item={item} onAddToCart={callbacks.onAddToCart} />;
  };

  return (
    <>
      {isCartOpen ? (
        <ModalLayout>
          <CartModal
            cart={cart}
            onClearItem={callbacks.onClearItem}
            onCloseCart={callbacks.onCloseCart}
          />
        </ModalLayout>
      ) : (
        ''
      )}
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          cartTotal={cartTotal}
          cartItems={cartItems}
          onOpenCart={callbacks.onOpenCart}
        />
        <List list={list} render={render} />
      </PageLayout>
    </>
  );
}

export default App;
