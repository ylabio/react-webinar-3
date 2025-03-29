import React, { useCallback } from 'react';
import List from './components/list';
import Basket from './components/basket';
import Popup from './components/popup';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basketList= store.getBasketState().list;
  const openPopupFlag = store.getOpenPopupFlag();

  const callbacks = {
    onBasketItem: useCallback(
      code => {
        store.addBasketItem(code);
      },
      [store],
    ),

    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onTogglePopupFlag: useCallback(() => {
      store.togglePopupFlag();
      console.log(openPopupFlag);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Приложение на React" />
      <Basket onTogglePopupFlag={callbacks.onTogglePopupFlag} basketList={basketList}/>

      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onBasketItem={callbacks.onBasketItem}
        onSelectItem={callbacks.onSelectItem}
      />
      <Popup onTogglePopupFlag={callbacks.onTogglePopupFlag} onDeleteItem={callbacks.onDeleteItem} openPopupFlag={openPopupFlag} basketList={basketList}/>
    </PageLayout>
  );
}

export default App;
