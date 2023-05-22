import React, {useCallback} from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basket = store.getState().basket;
  const basketIsOpened = store.getState().basketIsOpened

  const amount = basket.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const callbacks = {
    // открываем карзину
    onTaggleBasket: useCallback(() => {
      store.taggleBasket();
    }, [store]),

    // добавляем в карзину
    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),

    // удаляем из корзины
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onTaggle={callbacks.onTaggleBasket} basket={basket} />
      <List list={list} onAdd={callbacks.onAddItem}/>
      <Basket basket={basket} onDelete={callbacks.onDeleteItem} basketIsOpened={basketIsOpened} onTaggle={callbacks.onTaggleBasket}/>
    </PageLayout>
  );
}

export default App;
