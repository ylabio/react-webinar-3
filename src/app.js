import React, {useCallback, useState} from 'react';
import Basket from "./components/basket";
import Market from "./components/market";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [basketMode, setBasketMode] = useState(false);

  const onOpenBasket = () => {
    setBasketMode(true);
  };
  const onCloseBasket = () => {
    setBasketMode(false);
  };

  const list = store.getState().list;
  const listForBasket = list.filter(item => {
    if (item.count) return item
  });
  const totalPrice = listForBasket.reduce((total, listItem) => total + (listItem.price * listItem.count), 0);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, [store]),
  }

  return (
    <div>
      <Market list={list}
              totalItems={listForBasket.length}
              headTitle={'Магазин'}
              onOpenBasket={onOpenBasket}
              onAddItemToBasket={callbacks.onAddItemToBasket}
              listBtnText={'Добавить'}
              totalPrice={totalPrice}/>
      {
        basketMode &&
        <Basket list={listForBasket}
                totalPrice={totalPrice}
                onControlsBtnClick={onCloseBasket}
                onListItemBtnClick={callbacks.onDeleteItem}/>
      }
    </div>
  );
}

export default App;
