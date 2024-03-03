import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ShoppingCartModal from './components/shoppingCart-modal';

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
    handleClickOpenModal() {
      setIsModalVisible(prev => !prev)
    }
  }

  return (
    <PageLayout bemEntity='PageLayout'>
      <Head title='Магазин'/>
      <Controls
        shoppingCartList={shoppingCartList}
        handleClickOpenModal={callbacks.handleClickOpenModal}
        total={total}
      />
      <List
        list={list}
        onAddItemToShoppingCart={callbacks.onAddItemToShoppingCart}
      />
      {isModalVisible &&
        <ShoppingCartModal
          shoppingCartList={shoppingCartList}
          totalCost={total.totalCost}
          handleClickOpenModal={callbacks.handleClickOpenModal}
          onRemoveItemFromShoppingCart={callbacks.onRemoveItemFromShoppingCart}
        />
      }
    </PageLayout>
  );
}

export default App;
