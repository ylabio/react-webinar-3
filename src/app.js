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

  // подсчет стоимости товаров в корзине
  const price = basketList.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

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
    }, [store]),

    onOpenBasket: useCallback(() => {
     
    }, [])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpenBasket={callbacks.onOpenBasket} productsInBasket={basketList.length} price={price}/>
      <List
        list={list}
        onAction={callbacks.onAddProductToBasket}
      />

      {/* <Basket productsList={basketList}/> */}
    </PageLayout>
  );
}

export default App;
