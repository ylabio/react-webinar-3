import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import PageLayout from './components/page-layout';
import FooterCart from './components/footer-cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const amount = store.getState().amount;
  const sum = store.getState().sum;
  const itemsInCart = [...store.itemsInCart];
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('Modal-open');
  };

  const callbacks = {
    onAddItemInCart: useCallback((code) => {
      store.addItemInCart(code);
      store.calculateAmountItems();
    }, [store]),

    onDeleteItemInCart: useCallback((code) => {
      store.deleteItemInCart(code);
      store.calculateAmountItems();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCartAmount={amount} sumPrices={sum} showModal={showModal} setShowModal={setShowModal}/>
      <List list={list} onChangeItemInCart={callbacks.onAddItemInCart} isModalActive={showModal}/>
      <Modal modalTitle='Корзина' active={showModal} onClose={closeModal}>
        <List list={itemsInCart} onChangeItemInCart={callbacks.onDeleteItemInCart} isModalActive={showModal}/>
        <FooterCart sum={sum}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
