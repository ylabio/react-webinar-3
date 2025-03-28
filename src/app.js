import React, {useState, useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import CartFooter from "./components/cart-footer";
import {formattedNumber, plural} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getStateList();
  const {cartList, sizeCart, total} = store.getCartState();
  const [show, setShow] = useState(false);
  const [addedItem, setAddedItem] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(code => {
      store.clearCartItem(code);
    }, [store]),

    onAddCart: useCallback(code => {
      setAddedItem(true);

      store.addCartItem(code);

      setTimeout(() => {
        setAddedItem(false);
      }, 300);
    }, [store]),

    onShowCart: useCallback(() => {
      setShow(true);
    }, []),

    onHideCart: useCallback(() => {
      setShow(false);
    }, []),

  };

  const cartButtonLabel = (sizeCart === 0)
    ? "Пусто"
    : `${sizeCart} ${plural(sizeCart, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    })} / ${formattedNumber(total)}  ₽`


  return (
    <>
      <PageLayout>
        <Head title="Магазин"/>
        <Controls label={cartButtonLabel} onShowCart={callbacks.onShowCart} addedItem={addedItem}/>
        <List
          list={list}
          onClickAction={callbacks.onAddCart}
        />
      </PageLayout>
      {show && (<Modal handleClose={callbacks.onHideCart}>
        <List
          isCart={true}
          list={cartList}
          onClickAction={callbacks.onDeleteItem}
        />
        <CartFooter total={total}/>
      </Modal>)}
    </>
  );
}

export default App;
