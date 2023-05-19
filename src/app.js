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

  const list = store.getState().list;

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onRemoveFromCard: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={list} onRemoveFromCard={callbacks.onRemoveFromCard}/>
      <List list={list}
            onAddItemToCart={callbacks.onAddItemToCart} />
    </PageLayout>
  );
}

export default App;
