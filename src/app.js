import React, { useCallback, useState } from 'react';
import List from './components/list';
import Basket from './components/basket';
import Popup from './components/popup';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CloseButton from './components/close-button';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const list = store.getState().list;
  const basketState = store.getBasketState();

  const callbacks = {
    onBasketItem: useCallback(
      code => {
        store.addBasketItem(code);
      },
      [store],
    ),

    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onTogglePopupFlag: useCallback(() => {
      setIsPopupOpen(prev => !prev);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Basket onTogglePopupFlag={callbacks.onTogglePopupFlag} basketState={basketState}/>

      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onBasketItem={callbacks.onBasketItem}
      />
      <Popup
        title="Корзина"
        onTogglePopupFlag={callbacks.onTogglePopupFlag}
        onDeleteItem={callbacks.onDeleteItem}
        openPopupFlag={isPopupOpen}
        basketState={basketState} >
        <CloseButton onTogglePopupFlag={callbacks.onTogglePopupFlag}/>
      </Popup>
    </PageLayout>
  );
}

export default App;
