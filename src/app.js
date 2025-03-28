import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Basket from './components/basket'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const basketList = store.getState().basketList
  console.log(list)

  const callbacks = {
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

    onAddProductToBasket: useCallback((code) => {
      store.addProductToBasket(code)
    }, [store])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onAdd={callbacks.onAddItem} productsInBasket={basketList.length}/>
      <List
        list={list}
        onAction={callbacks.onAddProductToBasket}
        // onDeleteItem={callbacks.onDeleteItem}
        // onSelectItem={callbacks.onSelectItem}
      />

      {/* <Basket productsList={basketList}/> */}
    </PageLayout>
  );
}

export default App;
