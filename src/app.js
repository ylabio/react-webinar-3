import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import Block from "./components/ui/block";
import CartStatus from "./components/cart-status";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, price, cartList} = store.getState();

  const [isShowModal, setIsShowModal] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),

    onShowCart: useCallback(() => {
      setIsShowModal(true);
    }, [setIsShowModal]),

    onHideCart: useCallback(() => {
      setIsShowModal(false);
    }, [setIsShowModal]),
  }

  return (
    <>
      <Modal isOpen={isShowModal} onClose={callbacks.onHideCart}>
        <Cart
          list={cartList}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          onCloseButtonClick={callbacks.onHideCart}
          totalPrice={price}
        />
      </Modal>
      <PageLayout>
        <Head title='Магазин'/>
        <Block>
          <CartStatus totalCount={cartList.length} totalPrice={price}/>
          <Controls onShowCart={callbacks.onShowCart}/>
        </Block>
        <List
          list={list}
          onItemButtonClick={callbacks.onAddToCart}
          itemButtonCaption={'Добавить'}

        />
      </PageLayout>
    </>
  );
}

export default App;
