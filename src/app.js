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
  const cardInfo = store.getState().cardInfo;

  const callbacks = {
    onAddItemToCard: useCallback((code) => {
      store.addItemToCard(code);
    }, [store]),

    removeItemFromCard : useCallback((code) => {
      store.removeItemFromCard(code);
    },[store]),

  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onButtonClickInModalHandler={callbacks.removeItemFromCard} cardInfo ={cardInfo}/>
      <List list={list} onButtonClickHandler={callbacks.onAddItemToCard} itemButtonContent = "Добавить"/>
    </PageLayout>
  );
}

export default App;
