import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";
import CartItem from "./components/cart-item";
import Item from "./components/item"
import CartSummary from './components/cart-summary';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartWithInfo = cart.map(cartItem => {
    const { code, count } = cartItem;
    const { title, price } = list.find(item => item.code === code); 
    return { code, title, price, count };
  });
  const totalAmount = store.getCartAmount();
  const cartQuantity = store.getCartQuantity();

  const callbacks = {
    onAddItem: useCallback((item) => {
        store.addItemToCart(item);
    }, [store]),
    onDeleteItem: useCallback((item) => {
        store.deleteItemFromCart(item);
    }, [store]),
    toggleModal: useCallback(() => {
      setIsModalOpen(prevState => !prevState);
    }, [setIsModalOpen]),
  }
  
  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onAction={callbacks.toggleModal} cartQuantity={cartQuantity} totalAmount={totalAmount}/>
        <List
            list={list}
            renderItem={(item) => (
              <Item item={item} onAction={callbacks.onAddItem} actionText={'Добавить'} />
            )}
          />
      </PageLayout>
      {isModalOpen && <Modal toggleModal={callbacks.toggleModal} title='Корзина'>
          <List
            list={cartWithInfo}
            renderItem={(item) => (
              <CartItem item={item} onAction={callbacks.onDeleteItem} actionText={'Удалить'} />
            )}
          />
          <CartSummary totalAmount={totalAmount} />
      </Modal>}
    </>
  );
}

export default App;
