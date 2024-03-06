import React, { useState, useCallback } from 'react';
import { numberWithSpaces } from "./utils";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartCount = store.getState().cartCount;
  const cartSum = store.getState().cartSum;

  const [modal, setModalState] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <Controls cartCount={cartCount} cartSum={cartSum} text={'Перейти'} setModalState={setModalState} />
        <List list={list} text={'Добавить'}
          onItemClick={callbacks.onAddItem} />
      </PageLayout>
      <Modal cart={cart} cartSum={cartSum} modal={modal}>
        <Head title='Корзина'>
          <button onClick={() => setModalState(false)}>Закрыть</button>
        </Head>
        <List list={cart} text={'Удалить'} onItemClick={callbacks.onDeleteItem} />
        {cart.length > 0 &&
          <div className='Modal-footer'>
            <b>Итого </b><b>{numberWithSpaces(cartSum)} ₽</b>
          </div>
        }
      </Modal>
    </>
  );
}

export default App;
