import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isVisible, setIsVisible] = useState(false);
  const { list, cartList, total} = store.getState();

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.onRemoveFromCart(code);
    }, [store])
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls setVisible={setIsVisible} cartList={cartList} total={total} />
        <List
          list={list}
          callback={callbacks.onAddToCart}
        />
      </PageLayout>
      <Cart
        total={total}
        isVisible={isVisible}
        setVisible={setIsVisible} 
        cartList={cartList}
        onRemoveFromCart={callbacks.onRemoveFromCart}
      />
    </>
  );
}

export default App;
