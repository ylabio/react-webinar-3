import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Info from './components/info';
import Modal from './components/modal';
import ModalLayout from './components/modal-layout';
import ItemList from './components/item-list';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const products = store.getState().products;
  const active = store.getState().active;
  const totalPrice = store.getState().totalPrice;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddToCartItem: useCallback((code) => {
      store.addToCartItem(code);
    }, [store]),
    
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Info 
        data={products}
        totalPrice={totalPrice}
      >
        <Controls 
          onOpenModal={callbacks.onOpenModal}
        />
      </Info>
      <List 
        ItemComponent={ItemList}
        data={list}
        onAddToCartItem={callbacks.onAddToCartItem}
      />
      {active && (
        <ModalLayout>
          <Head 
            title="Корзина" 
            active={active} 
            onCloseModal={callbacks.onCloseModal} 
          />
          <Modal 
            data={products}
            onDeleteItem={callbacks.onDeleteItem}
            totalPrice={totalPrice}
          />
        </ModalLayout>
      )}
    </PageLayout>
  );
}

export default App;
