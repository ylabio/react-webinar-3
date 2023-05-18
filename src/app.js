import React, {useCallback, useState, useEffect} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import {formatAmount} from './utils';
import CheckoutItem from './components/checkout-item';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cartItems = store.getState().cartItems;
  const [sumCart, setSumCart] = useState(0);
  const [isModalChange, setModalChange] = useState(false);

  const openModelFormChange = (e) => {
    setModalChange(true);
  };
  const closeModel = () => {
    setModalChange(false);
  };
  const callbacks = {
    onAddItem: useCallback(
      (code) => {
        store.addToOrder(code);
      },
      [store]
    ),
    onRemoveItem: useCallback(
      (code) => {
        store.removeItem(code);
      },
      [store]
    ),
  };

  const quantityOfProduct = cartItems.reduce((sum, item) => sum + item.quantityUnique, 0);

  const sumItem = (cart) => {
    const sum = cart.reduce((accumulatedQuantity, cartItem) => {
      return accumulatedQuantity + cartItem.quantity * cartItem[0].price;
    }, 0);
    const formatSum = formatAmount(sum);
    setSumCart(formatSum);
  };

  useEffect(() => {
    sumItem(cartItems);
  }, [cartItems]);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls quantityOfProduct={quantityOfProduct} sumCart={sumCart} openModelFormChange={openModelFormChange} />
      {isModalChange && (
        <Modal closeModel={closeModel} title='Корзина'>
          <div className='Modal__basket'>
            <div className='Modal__margin'></div>
            {cartItems.map((value) => (
              <CheckoutItem key={value.code} {...value} removeItem={callbacks.onRemoveItem} />
            ))}
            <div className='Modal__total'>
              Итого <span>{sumCart} ₽</span>
            </div>
            <div className='Modal__margin-bottom'></div>
          </div>
        </Modal>
      )}
      <List list={list} addToOrder={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
