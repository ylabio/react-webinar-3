import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartTotalCount = store.getState().cartTotalCount;
  const cartTotalPrice = store.getState().cartTotalPrice;

  const callbacks = {
    addItemToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),
    removeItemFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),
    toggleModal: useCallback(() => {
      setIsModalOpen(prev => !prev);
    }, []),
  };
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartTotalCount={cartTotalCount}
        cartTotalPrice={cartTotalPrice}
        onCartClick={callbacks.toggleModal}
      />
      <List list={list} onAddToCart={callbacks.addItemToCart} />
      {isModalOpen && (
        <Modal
          title="Корзина"
          onClose={callbacks.toggleModal}
          footer={
            <div className="Cart-item Cart-item--total">
              <span>Итого:</span>
              <span>{cartTotalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
          }
        >
          <List list={cart} isCart onDelete={callbacks.removeItemFromCart} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
