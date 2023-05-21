import React, { useCallback, useState } from 'react';
import CartModal from "./components/cart";
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
  const [Cart, setCart] = useState(false);
  const callbacks = {
    onCartShow: useCallback(() => {
      setCart(true);
    }, [Cart]),

    onAddGoods: useCallback((code) => {
      store.onAddGoods(code);
    }, [store]),

    onDeleteGoods: useCallback((code) => {
      store.onDeleteGoods(code);
    }, [store])
  };

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <Controls
          onCartClick={callbacks.onCartShow}
          CartInfo={state.info}
        />
        <List list={state.list}
          buttonsAction={callbacks.onAddGoods}
          buttonsLabel="Добавить"
        />
      </PageLayout>

      {
        Cart ?
          <CartModal list={state.Cart}
            info={state.info}
            onDelete={callbacks.onDeleteGoods}
            setOpen={setCart}
          />
          : null
      }
    </>
  );
}

export default App;