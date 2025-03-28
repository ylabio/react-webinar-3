import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import CartButton from './components/cart-button';
import PageLayout from './components/page-layout';
import { selectList, selectCartItemsTotalCost, selectCartItemsUniqueCount } from './store';
import Item from './components/item';
import Button from './components/button';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = selectList(store.getState());

  const callbacks = {
    addToCart: useCallback(
      code => {
        store.addToCart(code);
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
              price={item.price}
              action={
                <Button
                  onClick={() => {
                    callbacks.addToCart(item.code);
                  }}
                >
                  Добавить
                </Button>
              }
            />
          )}
        />
      </PageLayout>
      <Modal title="Корзина" open={cartModalOpen} onClose={handleClose}></Modal>
    </>
  );
}

export default App;
