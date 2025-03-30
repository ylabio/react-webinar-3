import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = useCallback(() => setCartOpen(prev => !prev), []);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    deleteItemCart: useCallback(
      code => {
        store.deleteItemCart(code);
      },
      [store],
    ),
    onAddItemCart: useCallback(
      (code, title, price) => {
        store.addItemCart(code, title, price);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        deleteItemCart={callbacks.deleteItemCart}
        cartList={store.state.cartList}
        cartInfo={store.state.cartInfo}
        toggleCart={toggleCart}
      />
      <List
        list={list}
        ItemComponent={Item}
        action={callbacks.onAddItemCart}
      ></List>
      {cartOpen && (
        <Modal onClose={toggleCart}>
          <Cart
            onClose={toggleCart}
            total={store.state.cartInfo.total}
            cartList={store.state.cartList}
            deleteItemCart={callbacks.deleteItemCart}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
