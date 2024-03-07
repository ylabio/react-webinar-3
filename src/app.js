import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Item from "./components/item";
import Cart from './components/cart';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [modalOpen, setModalOpen] = useState(false);

  const list = store.getState().list;
  const cartList = list
    .sort((a,b) => a.code - b.code)
    .filter((item) => item.amount > 0)

  const callbacks = {
    onDeleteCart: useCallback((code) => {
      store.deleteCart(code);
    }, [store]),

    onAddCart: useCallback((code) => {
      store.addCart(code);
    }, [store]),

    onCartPrice: store.cartPrice(cartList)
  }

  return (
    <PageLayout>
        <Modal title='Корзина' isOpen={modalOpen} modalClose={() => setModalOpen(false)}>
            <Cart onDeleteCart={callbacks.onDeleteCart} store={store} cartList={cartList} />
        </Modal>
        <Head title='Магазин'/>
        <Controls modalOpen={() => setModalOpen(true)} store={store} cartList={cartList}/>
        <List list={list} onAddCart={callbacks.onAddCart} />
    </PageLayout>
  );
}

export default App;