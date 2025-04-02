import React, { useCallback, useState } from 'react';
import List from './components/list';
import BasketButton from './components/basket-button';
import Popup from './components/popup';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CloseButton from './components/close-button';
import Basket from './components/basket';

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
      <BasketButton onTogglePopupFlag={callbacks.onTogglePopupFlag} basketState={basketState}/>

      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onBasketItem={callbacks.onBasketItem}
      />
      <Popup
        title="Корзина"
        openPopupFlag={isPopupOpen} >
        <CloseButton onTogglePopupFlag={callbacks.onTogglePopupFlag}/>
        <Basket
          onDeleteItem={callbacks.onDeleteItem}
          basketState={basketState}
        />
      </Popup>
    </PageLayout>
  );
}

export default App;
