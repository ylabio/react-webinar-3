import React, { useCallback, useState } from 'react';
import List from './components/list';
import CartList from './components/cart-list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import CartButton from './components/cart-button';
import PageLayout from './components/page-layout';
import {
  selectList,
  selectCartItemsTotalCost,
  selectCartItemsUniqueCount,
  selectCart,
} from './store';
import Item from './components/item';
import Button from './components/button';
import { formatCurrency } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = selectList(store.getState());
  const cart = selectCart(store.getState());

  const callbacks = {
    addToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    removeFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
  };
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const itemsCount = selectCartItemsUniqueCount(store.getState());
  const totalCost = selectCartItemsTotalCost(store.getState());

  const handelCartClick = () => {
    setCartModalOpen(true);
  };
  const handleClose = () => {
    setCartModalOpen(false);
  };
  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls>
          <CartButton itemCount={itemsCount} totalCost={totalCost} onClick={handelCartClick} />
        </Controls>
        <List
          list={list}
          renderItem={item => (
            <Item
              title={item.title}
              action={
                <Button
                  onClick={() => {
                    callbacks.addToCart(item.code);
                  }}
                >
                  Добавить
                </Button>
              }
            >
              <span style={{ textAlign: 'end' }}>{formatCurrency(item.price)}</span>
            </Item>
          )}
        />
      </PageLayout>
      <Modal title="Корзина" open={cartModalOpen} onClose={handleClose}>
        <CartList list={cart} onDelete={code => callbacks.removeFromCart(code)} />
      </Modal>
    </>
  );
}

export default App;
