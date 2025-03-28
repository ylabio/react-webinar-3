import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Store from "./store";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store = new Store() }) {
  const list = store.getState().list;

  const [cart, setCart] = useState([
    {...list[0], count: 2},
    {...list[1], count: 1},
  ]);

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        [...cart].find((item) => item.code === code)
          ?
            setCart(
              cart.map(
                (item) => item.code === code
                  ? { ...item, count: item.count + 1 }
                  : item
              )
            )
          :
            setCart(
              [...cart, {...list.find((item) => item.code === code), count: 1}]
            );
      },
      [cart],
    ),

    onDeleteFromCart: useCallback(
      (code) => {
        setCart([...cart].filter((item) => item.code !== code));
      },
      [cart],
    )
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cart={cart}
        onDeleteFromCart={callbacks.onDeleteFromCart}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
