import React, { useCallback } from 'react';
import List from './components/list';
import Basket from './components/basket';
import Controls from './components/controls';
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
  const openPopupFlag = store.getOpenPopupFlag().list;

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
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Приложение на React" />
      <Basket onAdd={callbacks.onTogglePopupFlag} basketList={basketList}/>

      {/* <Controls onAdd={callbacks.onAddItem} /> */}
      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onBasketItem={callbacks.onBasketItem}
        onSelectItem={callbacks.onSelectItem}
      />
    </PageLayout>
  );
}

export default App;
