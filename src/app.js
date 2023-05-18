import React, { useCallback, useState } from 'react';
import BasketWindow from "./components/basket";
import Catalog from './components/catalog';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const state = store.getState();
  
  const [basket, setBasket] = useState(false);

  const callbacks = {
    onBasketShow: useCallback(() => {
      setBasket(true);
    }, [basket]),

    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, [store]),

    onDeleteItemFromBasket: useCallback((code) => {
      store.deleteItemFromBasket(code);
    }, [store])
  };

  return (
    <>
      <Catalog list={state.list} info={state.info}
        onAddToBasket={callbacks.onAddItemToBasket}
        onBasketShow={callbacks.onBasketShow}
      />

      {
        basket ?
          <BasketWindow list={state.basket} info={state.info}
            onDelete={callbacks.onDeleteItemFromBasket}
            setOpen={setBasket}
          />
          : null
      }
    </>
  );
}

export default App;