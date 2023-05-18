import React, { useCallback, useState } from 'react';
import BasketWindow from "./components/basket";
import Controls from "./components/controls";
import Head from "./components/head";
import List from "./components/list";
import PageLayout from "./components/page-layout";

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
      <PageLayout>
        <Head title='Магазин' />
        <Controls
          onBasketClick={callbacks.onBasketShow}
          basketInfo={state.info}
        />
        <List list={state.list}
          buttonsAction={callbacks.onAddItemToBasket}
          buttonsLabel="Добавить"
        />
      </PageLayout>

      {
        basket ?
          <BasketWindow list={state.basket}
            info={state.info}
            onDelete={callbacks.onDeleteItemFromBasket}
            setOpen={setBasket}
          />
          : null
      }
    </>
  );
}

export default App;