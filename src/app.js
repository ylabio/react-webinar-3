import React, {useCallback} from 'react';
import List from "./components/list";
import Cart from "./components/cart";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const { list, cartList, showCart } = store.getState();

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    onOpenCart: useCallback(() => {
      store.setCartVisibility(true);
    }, [store]),

    onCloseCart: useCallback(() => {
      store.setCartVisibility(false);
    }, [store])
  }

  return (
    <PageLayout>
      <Modal 
        title='Корзина' 
        show={showCart}
        buttonText='Закрыть'
        onClose={callbacks.onCloseCart}
      >
        <Cart cartList={cartList} onDeleteItem={callbacks.onDeleteItem}/>
      </Modal>
      <Head title='Магазин'/>
      <Controls onClick={callbacks.onOpenCart} cartList={cartList}/>
      <List list={list}
            onAddItem={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
