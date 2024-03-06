import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Popup from './components/popup';
import PopupLayout from './components/popup-layout';
import BasketTotal from './components/basket-total';
import BasketItem from './components/basket-item';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const list = store.getState().list;
  const basket = store.getState().basketList;

  const callbacks = {
    onAddToBasket: useCallback((item) => {
      store.addItemToBasket(item);
    }, [store]),

    onClick: useCallback(() => {
      setIsPopupOpened(true);
    }, [isPopupOpened]),

    onClose: useCallback(() => {
      setIsPopupOpened(false);
    }, [isPopupOpened]),

    onRemoveFromBasket: useCallback((item) => {
      store.removeItemFromBasket(item);
    },[store])
  }

  const totalCost = () => {
    return basket.reduce((acc, item) => acc + item.price * item.count, 0)
  };

  const defineItem = (item, isBasket) => {
    if(isBasket === true) {
      return(
        <BasketItem item={item} onClick={callbacks.onRemoveFromBasket} />
      )
    } else {
      return (
        <Item item={item} onClick={callbacks.onAddToBasket} />
      )
    }
  }

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCost={totalCost} basket={basket} list={list} onClick={callbacks.onClick}/>
      <List defineItem={(item) => defineItem(item, false)} list={list}  onClick={callbacks.onAddToBasket}/>
    </PageLayout>
    {isPopupOpened === true &&
    <PopupLayout title='Корзина' isPopupOpened={isPopupOpened} onClose={callbacks.onClose}>
      <List defineItem={(item) => defineItem(item, true)} list={basket} />
      <BasketTotal totalCost={totalCost} />
    </PopupLayout>
    }
    </>
  );
}

export default App;
