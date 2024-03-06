import React, {useCallback} from 'react';
import Cart from './components/cart-layout'
import Footer from './components/footer'
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
  const total = store.getState().totalPrice;

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
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onOpenCart={callbacks.onOpenCart}
                  textBtn={'Перейти'} count={cart.length}
                  amount={total}/>
        <List list={list}
              buttonText={'Добавить'}
              onAddItem={callbacks.onAddItem}/>
      </PageLayout>
      {store.state.cartIsOpen && (
        <Cart onOpenCart={callbacks.onOpenCart}>
          <Head title={'Корзина'} onCloseCart={callbacks.onOpenCart}/>
          <div>
            <List list={cart}
                  buttonText={'Удалить'}
                  onDeleteItem={callbacks.onDeleteItem}/>
            <Footer total={total}/>
          </div>
        </Cart>
      )}
    </>
  );
}

export default App;
