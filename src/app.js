import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const uniqueProductsCount = store.getState().uniqueProductsCount;
  const totalPrice = store.getState().price;
  const cart = store.getState().cart;

  const [modalActive, setActive] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteProduct: useCallback((code) => {
      store.deleteItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls setActive={setActive} uniqueProductsCount={uniqueProductsCount.size} totalPrice={totalPrice}/>
      <List list={list}
            action={callbacks.onAddToCart}
            type='list'
            onSelectItem={callbacks.onSelectItem} />
      <Modal active={modalActive} setActive={setActive}>
        <Head title='Корзина' setActive={setActive}></Head>
        <List list={cart} type='cart' totalPrice={totalPrice} action={callbacks.onDeleteProduct}></List>
      </Modal>
    </PageLayout>
  );
}

export default App;
