import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [basket, setBasket] = useState(false);
  const { list, cart, total } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {  
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store])
  }
  
  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        cart={cart}
        total={total}
        basket={basket}
        setBasket={setBasket}
      />
      <List list={list} onAction={callbacks.onAddToCart} buttonText='Добавить' />
      {
        basket &&
        <Basket
          setBasket={setBasket}
          basketTitle='Корзина'
          list={cart}
          total={total}
        >
          <List list={cart} onAction={callbacks.onRemoveFromCart} buttonText='Удалить' />
        </Basket>
      }
    </PageLayout>
  )
}

export default App;