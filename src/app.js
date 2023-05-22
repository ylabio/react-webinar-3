import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart} = store.getState();

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} onDelete={callbacks.onDeleteItemFromCart}/>
      <List list={list} onClick={callbacks.onAddItemToCart} btnTitle={"Добавить"}/>
    </PageLayout>
  );
}

export default App;
