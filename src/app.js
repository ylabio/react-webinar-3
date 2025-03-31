import React, { useState, useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import CartBottomPanel from "./components/cart-bottom-panel";
import { cartButtonLabel, formattedNumber, plural } from "./utils";
import { createHooks } from "./hooks";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */


function App( { store } ) {

  const list = store.getStateList();
  const { cartList, sizeCart, total } = store.getCartState();
  const [ show, setShow ] = useState( false );
  const [ addedItem, setAddedItem ] = useState( false );

  const hooks = createHooks(store, setShow, setAddedItem);

  const cartBtnLabel = cartButtonLabel(sizeCart, total);

  return (
    <>
      <PageLayout nonScroll={ show }>
        <Head title="Магазин"/>
        <Controls label={ cartBtnLabel } onShowCart={ hooks.onShowCart } addedItem={ addedItem }/>
        <List
          list={ list }
          onClickAction={ hooks.onAddCart }
        />
      </PageLayout>
      { show && ( <Modal handleClose={ hooks.onHideCart }>
        <List
          isCart={ true }
          list={ cartList }
          onClickAction={ hooks.onDeleteItem }
        />
        <CartBottomPanel total={ total }/>
      </Modal> ) }
    </>
  );
}

export default App;
