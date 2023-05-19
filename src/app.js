import React, {useCallback, useMemo, useState} from 'react';
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

  const list = store.getState().list;
  const total = useMemo(() => store.getTotal(), [store.state.cart, store.state.list]);
  const cardList = useMemo(() => store.getCardList(), [store.state.cart, store.state.list]);

  const [isShowModal, setIsShowModal] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.onAddToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.onDeleteFromCart(code);
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
          list={cardList}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          onCloseButtonClick={callbacks.onHideCart}
          totalPrice={total.price}
        />
      </Modal>
      <PageLayout>
        <Head title='Магазин'/>
        <Block>
          <CartStatus totalCount={total.count} totalPrice={total.price}/>
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
