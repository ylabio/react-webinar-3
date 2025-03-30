import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = list.filter(item => item.cartQuantity);
  const uniqueItems = store.getState().uniqueItems
  const totalCost = store.getState().totalCost

  const callbacks = {
    onDeleteItemCart: useCallback(
      code => {
        store.deleteItemCart(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItemCart(code);
      },
      [store],
    ),
  };

  const renderItem = item => <Item item={item} onAddItem={callbacks.onAddItem}/>

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        onDelete={callbacks.onDeleteItemCart}
        cartList={cartList}
        totalCost={totalCost}
        uniqueItems={uniqueItems}
      />
      <List list={list} renderItem={renderItem} />
    </PageLayout>
  );
}

export default App;
