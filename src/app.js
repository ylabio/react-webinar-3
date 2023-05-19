import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isModalVisible, setIsModalVisible] = useState(false)

  const callbacks = {

    onToggleModal: useCallback(() => {
      setIsModalVisible(!isModalVisible)
    }),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Cart cart={cart}
        onDeleteItem={callbacks.onDeleteItem}
        isModalVisible={isModalVisible}>
      </Cart>
      <Head title='Магазин'/>
      <Controls onToggleModal={callbacks.onToggleModal}/>
      <List list={list}
        onAddItem={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
