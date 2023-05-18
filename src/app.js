import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basket = store.getState().basket;
  let calculatePrice = store.getCalculatePrice()

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    onAddItem: useCallback((code, title, price) => {
      store.addItemToBasket(code, title, price);
    }, [store]),

  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls basket={basket}
            calculatePrice={calculatePrice}
      />
      <List list={list}
            onAddItem={callbacks.onAddItem}
            />
        <Modal basket={basket}/>
    </PageLayout>
  );
}

export default App;
