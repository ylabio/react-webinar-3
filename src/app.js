import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from "./components/cart";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const isOpen = store.getState().isCartVisible;
  const [ cart, setCart ] = useState(new Map());
  const [ total, setTotal ] = useState(0);

  const callbacks = {
    openCart: useCallback(() => {
      store.setIsOpen(true)
    }, [store]),

    closeCart: useCallback(() => {
      store.setIsOpen(false);
    }, [store]),

    onAddItem: item => {
      const newMap = new Map(cart);
      newMap.set(item, newMap.has(item) ? newMap.get(item) + 1 : 1);
      setCart(newMap);
      setTotal(prevState => prevState + item.price);
    },

    onRemoveItem: item => {
      const newMap = new Map(cart);
      const value = item.price * newMap.get(item)
      newMap.delete(item);
      setCart(newMap);
      setTotal(prevState => prevState - value);
    },

    transformCart: cart => {
      return Array.from(cart.keys()).map(item => {
        item.count = cart.get(item);
        return item;
      });
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls openCart={ callbacks.openCart }
                cart={ cart }
      />
      <List list={list} onClick={ callbacks.onAddItem }/>
      { isOpen && <Cart onCloseCart={ callbacks.closeCart }
                        onRemoveItem={ callbacks.onRemoveItem }
                        cart={ callbacks.transformCart(cart) }
                        total={ total }
                        title='Корзина'
      /> }
    </PageLayout>
  );
}

export default App;
