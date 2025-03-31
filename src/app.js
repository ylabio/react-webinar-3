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
  const list = store.getState().list;
  const cart = store.getAddedToCartItems();
  const quantity = store.getAddedToCartQuantity().toLocaleString('ru-RU');
  const totalPrice = store.getCartTotalPrice().toLocaleString('ru-RU');

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      item => {
      store.addItem(item);
    }, [store]),

    onCartOpen: useCallback(() => {
      setIsCartModalOpen(true);
    }, [])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onCartOpen={callbacks.onCartOpen} quantity={quantity} totalPrice={totalPrice} />
      <List
        list={list}
        actionType={'add'}
        onAction={callbacks.onAddItem}
      />
      {
        isCartModalOpen && (
          <Modal onCloseModal={() => setIsCartModalOpen(false)}>
            <h2 className="ModalTitle">Корзина</h2>
            <div className='Content'>
              <List
                list={cart}
                actionType={'delete'}
                onAction={callbacks.onDeleteItem}
                withCounter
              />
            </div>
            <div className='Total'>
              <p>Итого:</p>
              <p>{totalPrice} ₽</p>
            </div>
          </Modal>
        )
      }
    </PageLayout>
  );
}

export default App;
