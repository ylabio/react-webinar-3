import React from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import FinalCost from './components/final-cost';
import Hint from './components/hint';
import { ListCart } from './components/list-cart';
import { STRINGS } from './const';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const shopData = {
    list: state.list,
    cart: state.cart,
    isOpened: state.isOpened,
    totalQuantity: state.totalQuantity,
    totalAmount: state.totalAmount,
  };
  const show = shopData.totalQuantity === 0;

  const callbacks = {
    onAddToCart: React.useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onRemoveFromCart: React.useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
    onToggleCartModal: React.useCallback(
      code => {
        store.toggleCartModal(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title={STRINGS.STORE} />
      <Cart
        totalQuantity={shopData.totalQuantity}
        totalAmount={shopData.totalAmount}
        toggleCartModal={callbacks.onToggleCartModal}
      />
      <List
        list={shopData.list}
        onAddToCart={callbacks.onAddToCart}
      />
      <Modal
        title={STRINGS.CART}
        isOpened={shopData.isOpened}
        toggleCartModal={callbacks.onToggleCartModal}
      >
        <Hint
          title={STRINGS.EMPTY_CART_HINT}
          show={show}
        />
        <ListCart
          list={shopData.cart}
          isCart={true}
          onRemoveFromCart={callbacks.onRemoveFromCart}
        />
        <FinalCost
          show={!show}
          totalAmount={shopData.totalAmount}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
