import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ShoppingCartModal from './components/modal/shoppingcart-modal';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const list = store.getState().list;
  const shoppingCartList = store.getState().shoppingCart.list;
  const total = store.getState().shoppingCart.total; // totalAmount & totalCost included as obj

  const callbacks = {
    onAddItemToShoppingCart: useCallback((item) => {
      store.addItemToShoppingCart(item);
    }, [store]),
    onRemoveItemFromShoppingCart: useCallback((item) => {
      store.removeItemFromShoppingCart(item);
    }, [store]),
    handleOpenModal() {
      setIsModalVisible(true)
    },
    handleCloseModal() {
      setIsModalVisible(false)
    }
  }

  return (
    <PageLayout bemEntity='PageLayout'>
      <Head title='Магазин'/>
      <Controls
        shoppingCartList={shoppingCartList}
        handleOpenModal={callbacks.handleOpenModal}
        total={total}
      />
      <List
        list={list}
        onAddItemToShoppingCart={callbacks.onAddItemToShoppingCart}
      />
      {isModalVisible &&
        <Modal
          title='Корзина'
          handleCloseModal={callbacks.handleCloseModal}
        >
          <ShoppingCartModal
            shoppingCartList={shoppingCartList}
            total={total}
            onRemoveItemFromShoppingCart={callbacks.onRemoveItemFromShoppingCart}
        />
        </Modal>
      }
    </PageLayout>
  );
}

export default App;
