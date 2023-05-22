import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const [isOpened, setOpened] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onSetOpened: useCallback(() => {
      setOpened(true);
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={cart} setOpened={setOpened}/>
      <List list={list} functionResolver={callbacks.onAddItemToCart} buttonTitle='Добавить'/>
      <Cart list={cart} isOpened={isOpened} setOpened={setOpened} onDeleteItem={callbacks.onDeleteItem}/>
    </PageLayout>
  );
}

export default App;
