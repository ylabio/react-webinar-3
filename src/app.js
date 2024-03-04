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
        addToBasketItem: useCallback((code) => {
            store.addToBasketItem(code);
        }, [store]),

        goToBasketItem: useCallback(() => {
            store.goToBasketItem();
        }, [store])
    }

  return (
      <PageLayout>
          <Head title='Приложение на чистом JS'/>
          <Controls goToBasketItem={callbacks.goToBasketItem} addToBasketCount={store.getBasketItemCount}/>
          <List list={list} addToBasketItem={callbacks.addToBasketItem} addToBasketCount={store.getBasketItemCount} />
      </PageLayout>
  );
}

export default App;
