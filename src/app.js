import React, {useCallback, useState} from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Item from "./components/item";
import Modal from "./components/modal";
import { numberFormat } from "./utils";
import CartItem from "./components/cart-item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = list.filter(item => item.cartQuantity);
  const uniqueItems = store.getState().uniqueItems
  const totalCost = store.getState().totalCost
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    onDeleteItemCart: useCallback(
      code => {
        store.deleteItemCart(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItemCart(code);
      },
      [store],
    ),

    onOpenModal: useCallback(() => {
      setIsOpenModal(true);
    }, [isOpenModal]),

    onCloseModal: useCallback(() => {
      setIsOpenModal(false);
    }, [isOpenModal]),
  };

  const renderItem = item => <Item item={item} onAddItem={callbacks.onAddItem}/>
  const renderCartItem = cartItem => <CartItem cartItem={cartItem} onDeleteItem={callbacks.onDeleteItemCart} />

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        onOpenModal={callbacks.onOpenModal}
        totalCost={totalCost}
        uniqueItems={uniqueItems}
      />
      <List list={list} renderItem={renderItem} />
      <Modal isOpen={isOpenModal} onClose={callbacks.onCloseModal}>
        <>
          <List list={cartList} renderItem={renderCartItem}/>
          <div className="Cart-totalCost">
            <h4>Итого:</h4>
            <h4> {numberFormat(totalCost)} ₽</h4>
          </div>
        </>
      </Modal>
    </PageLayout>
  );
}

export default App;
