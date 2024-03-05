import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import {formatNumber} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart, sum} = store.getState();

  const [showModal, setShowModal] = useState(false);

  const quantity = cart.length;

  const callbacks = {
    onAddToCart: useCallback((product) => {
      store.addToCart(product);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
  }


  const onHideModal = () => {
    setShowModal(false);
  };
  const onShowModal = () => {
    setShowModal(true);
  };

  return (
    <PageLayout showModal={showModal} >
      <Head title='Магазин'/>
      <Controls sum={sum} quantity={quantity} onShowModal={onShowModal}/>
      <List list={list} showModal={showModal}
            onAddToCart={callbacks.onAddToCart}
      />
      <Modal title='Корзина' showModal={showModal} onHideModal={onHideModal}>
        <List list={cart} showModal={showModal}
              onDeleteItem={callbacks.onDeleteItem}/>
        {cart.length > 0
          ? <div className='Modal-footer'>
            <span>Итого</span>  {formatNumber(sum)} ₽
          </div>
          : <h2>В вашей корзине пока пусто</h2>
        }
      </Modal>
    </PageLayout>
  );
}

export default App;
