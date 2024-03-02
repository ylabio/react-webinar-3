import React, {useCallback} from 'react';
import Cart from './components/cart'
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;


  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),

    onOpenCart: useCallback(() => {
      store.changeCartIsOpen()
    }, [store]),

    getTotal: useCallback(() => {
      return cart.reduce((sum, item) => sum + item.price * item.count, 0)
    }, [store])
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onOpenCart={callbacks.onOpenCart} textBtn={'Перейти'} amount={callbacks.getTotal}/>
        <List list={list}
              buttonText={'Добавить'}
              onAddItem={callbacks.onAddItem}/>
      </PageLayout>
      {store.state.cartIsOpen &&
        (<Cart list={cart}
               onOpenCart={callbacks.onOpenCart}
               onDeleteItem={callbacks.onDeleteItem} />)
      }
    </>
  );
}

export default App;
