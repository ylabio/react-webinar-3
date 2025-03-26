import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;

  const callbacks = {
    onDeleteItemFromCart: useCallback(
      itemCode => {
        store.deleteItemFromCart(itemCode);
      },
      [store],
    ),
    onAddItemToCart: useCallback(
      itemCode => {
        store.addItemToCart(itemCode);

      }, [store]),
  };

  return (
    <PageLayout>
      <Head title="магазин"/>
      <Controls onAdd={()=>{console.log('ddd')}} />
      <List
        list={list}
        isCartList={false}
        onClickItem={callbacks.onAddItemToCart}
      />
    </PageLayout>
  );
}

export default App;
