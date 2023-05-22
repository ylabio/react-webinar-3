import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import ResultPrice from './components/result-price';
import Item from './components/item';
import ItemCart from './components/item-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const [modalActive, setModalActive] = useState(false);

  const list = store.getState().list;
  const cartPrice = store.getState().cartPrice;
  const cartLength = store.getState().cartLength;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store])
  }

  return (
    <div>
      <PageLayout>
        <Head title='Магазин' />
        <Controls cartPrice={cartPrice} cartLength={cartLength} setModalActive={setModalActive} />
        <List list={list} onActionWithItem={callbacks.onAddItem}>
          <Item />
        </List>
      </PageLayout>
      <Modal active={modalActive} setModalActive={setModalActive}>
        <Head title='Корзина' />
        <List list={cart} onActionWithItem={callbacks.onDeleteItem}>
          <ItemCart />
        </List>
        <ResultPrice title='Итого ' price={cartPrice}/>
      </Modal>
    </div>
  );
}

export default App;
