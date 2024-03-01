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
    showModal: useCallback(() => {
      alert('hello')
    }, [store]),
    onAddItemToBasket: useCallback((item) => {
      store.addItemToBasket(item)
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls callback={callbacks.showModal} title={'Перейти'}/>
      <List list={list}
            onAddItemToBasket={callbacks.onAddItemToBasket}/>
    </PageLayout>
  );
}

export default App;
