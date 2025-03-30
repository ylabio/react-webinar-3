import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';
import Item from './components/item';
import CartItem from './components/cart-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, totalPrice, countCart } = store.getState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),

    onRenderProducts: useCallback(item => <Item item={item} onAddItem={callbacks.onAddItem} />, []),

    onRenderCartItems: useCallback(
      cartItem => (
        <CartItem
          item={list.find(item => item.code === cartItem.code)}
          count={cartItem.count}
          onDeleteItem={callbacks.onDeleteItem}
        />
      ),
      [],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />

      <Controls totalPrice={totalPrice} onOpenModal={setIsModalOpen} countCart={countCart} />

      <Modal active={isModalOpen} onClose={setIsModalOpen}>
        <Cart
          onClose={setIsModalOpen}
          cart={cart}
          sumPrice={totalPrice}
          onRenderCartItems={callbacks.onRenderCartItems}
        />
      </Modal>

      <List list={list} renderItem={callbacks.onRenderProducts} />
    </PageLayout>
  );
}

export default App;
