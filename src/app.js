import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Popup from './components/popup';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isPopupopened, setIsPopupOpened] = useState(false);

  const list = store.getState().list;
  const basket = store.getState().basketList;
  const removeItemFromBasket = store.removeItemFromBasket;
  console.log(basket)

  const callbacks = {
    onAddToBasket: useCallback((item) => {
      store.addItemToBasket(item);
    }, [store]),

    onClick: useCallback(() => {
      setIsPopupOpened(true);
    }, [isPopupopened]),

    onClose: useCallback(() => {
      setIsPopupOpened(false);
    }, [isPopupopened]),

    onRemoveItemFromBasket: useCallback(() => {
      store.removeItemFromBasket(item);
    },[store])
  }

  const totalCost = () => {
    return basket.reduce((acc, item) => acc + item.price * item.count, 0)
  };

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCost={totalCost} basket={basket} list={list} onClick={callbacks.onClick}/>
      <List list={list} onAddToBasket={callbacks.onAddToBasket}/>
    </PageLayout>
    {isPopupopened === true &&
      <Popup
      totalCost={totalCost}
      onRemoveItemFromBasket={callbacks.onRemoveItemFromBasket}
      basket={basket}
      isPopupopened={isPopupopened}
      onClose={callbacks.onClose}/>
    }
    </>
  );
}

export default App;
