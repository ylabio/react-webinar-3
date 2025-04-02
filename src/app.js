import React, { useState } from 'react';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import List from './components/list';
import { cartButtonLabel } from './utils';
import { createHooks } from './hooks';
import RenderItem from "./components/item-render";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getStateList();
  const { cartList, sizeCart, total } = store.getCartState();
  const [show, setShow] = useState(false);
  const [addedItem, setAddedItem] = useState(false);

  const hooks = createHooks(store, setShow, setAddedItem);

  const cartBtnLabel = cartButtonLabel(sizeCart, total);

  return (
    <>
      <PageLayout nonScroll={show}>
        <Head title="Магазин" />
        <Controls label={cartBtnLabel} onShowCart={hooks.onShowCart} addedItem={addedItem} />
        <List list={list} renderItem={RenderItem} onClickAction={hooks.onAddCart} isCart={false} total={0} />
      </PageLayout>
      {show && (
        <Modal handleClose={hooks.onHideCart}>
          <List list={cartList} renderItem={RenderItem} onClickAction={hooks.onDeleteItem} isCart={true} total={total} />
        </Modal>
      )}
    </>
  );
}

export default App;

