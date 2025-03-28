import React, { useCallback, useState } from 'react';
import List from './components/list';
import CartButton from './components/cart-button';
import CartModal from './components/cart-modal';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const callbacks = {
    onDeleteItem: useCallback(
      title => {
        store.deleteItem(title);
      },
      [store]),

    onAddItem: useCallback(title => {
      store.addItemToCart(title);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartButton itemCount={store.getState().cartList.length} totalPrice={store.getTotalPrice()} onToggle={toggleModal} />
      <List
        list={list}
        onAddToCart={callbacks.onAddItem}
      />
      {isModalOpen && <CartModal cartList={cartList} cartItems={cart} onClose={toggleModal} onDeleteItem={callbacks.onDeleteItem} totalPrice={store.getTotalPrice()}/>}
    </PageLayout>
  );
}

export default App;
