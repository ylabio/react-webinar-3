import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import Order from "./components/order";
import {formatCurrency} from "./utils";
import OrderIcon from "../src/components/order-icon/index";
import ModalIcon from "../src/components/modal-icon/index";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const callbacks = {
    onRemove: useCallback(
      code => {
        store.delItem(code);
      },
      [store],
    ),

    onAdd: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    openModal: useCallback(() => {
      setIsModalOpen(true);
    }, []),

    closeModal: useCallback(() => {
      setIsModalOpen(false);
    }, [])

  };

  const [isModalOpen, setIsModalOpen] = useState(false);




  const orderList = store.getOrder();
  console.log('app');
  const totalAmount = orderList.reduce((sum, item) => sum + item.price * item.inOrder, 0);

  const formattedTotalAmount = formatCurrency(totalAmount);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onClick={callbacks.openModal}
        order={orderList.length}
        buttonText={'Пусто'}
        style={'order'} totalAmount={formattedTotalAmount} Icon={OrderIcon}/>
      <List
        list={list}
        onAdd={callbacks.onAdd}
        isModal={false}
        onRemove={callbacks.onRemove}
      />
      <Modal isOpen={isModalOpen} onClose={callbacks.closeModal} Icon={ModalIcon}>
        <Order orderList={orderList} isModalOpen={isModalOpen} totalAmount={formattedTotalAmount} store={store} onRemove={callbacks.onRemove} />

      </Modal>
    </PageLayout>
  );
}

export default App;
