import React, { useCallback, useEffect, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { plural } from './utils';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  let cart = store.getCart();
  const [cartTitle, setCartTitle] = useState('Пусто');
  let totalAmount = 0;
console.log(cart);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCartTitle = () => {
    totalAmount = cart.length > 0 ? cart.reduce((acc, cur) => acc + cur.amount * cur.price, 0) : 0;
    setCartTitle(
      cart.length > 0
        ? `${cart.length} ${plural(cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${totalAmount.toLocaleString('ru-RU')} ₽`
        : 'Пусто',
    );
  };

  const callbacks = {
    onAddToCart: useCallback(
      item => {
        cart = store.addToCart(item);
        handleCartTitle();
      },
      [store],
    ),
    onDeleteItem: useCallback(
      item => {
        cart = store.deleteItem(item);
        handleCartTitle();
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls handleOpen={handleOpen} text={cartTitle} />
      {isOpen && <Modal list={cart} onAction={callbacks.onDeleteItem} closeModal={setIsOpen} />}
      <List list={list} onAction={callbacks.onAddToCart} style="add" />
    </PageLayout>
  );
}

export default App;
