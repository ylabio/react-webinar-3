import React, { useState, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import ModalHead from './components/modal-head';
import ModalControls from './components/modal-controls';
import ModalFooter from './components/modal-footer';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;
  const { cart, totalPrice, uniqueCount } = store.getState();

  const callbacks = {
    onOpenCart: () => setCartOpen(true),
    onCloseCart: () => setCartOpen(false),

    onAddCartItem: useCallback(
      code => {
        store.addCartItem(code);
      },
      [store]
    ),

    onDeleteCartItem: useCallback(
      code => {
        store.deleteCartItem(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        totalPrice={totalPrice}
        uniqueCount={uniqueCount}
        onOpenCart={callbacks.onOpenCart} 
      />
      <List
        list={list}
        onAddCartItem={callbacks.onAddCartItem}
      />
      {isCartOpen
        ?
          <ModalLayout>
            <ModalHead title="Корзина" />
            <ModalControls
              onCloseCart={callbacks.onCloseCart}
            />
            <List
              list={cart}
              onDeleteCartItem={callbacks.onDeleteCartItem}
            />
            <ModalFooter label="Итого:" totalPrice={totalPrice} />
          </ModalLayout>
        :
          <></>
      }
    </PageLayout>
  );
};

export default App;