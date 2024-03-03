import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartLayout from "./components/cart-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart, sum} = store.getState();

  const [showCart, setShowCart] = useState(false);

  const quantity = cart.length;

  const callbacks = {
    onAddToCart: useCallback((product) => {
      store.addToCart(product);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
  }


  const onHideCart = () => {
    setShowCart(false);
  };
  const onShowCart = () => {
    setShowCart(true);
  };


  return (
    <PageLayout>
      <Head title='Магазин' hideCart={true}/>
      <Controls hideCart={true} sum={sum} quantity={quantity} onShow={onShowCart}/>
      <List list={list} hideCart={true}
            onAddToCart={callbacks.onAddToCart}
      />
      <CartLayout cart={cart} sum={sum} showCart={showCart}>
        <Head title='Корзина'  hideCart={false} onHideCart={onHideCart}/>
        <Controls hideCart={false}/>
        <List list={cart} hideCart={false}
              onDeleteItem={callbacks.onDeleteItem}/>
      </CartLayout>
    </PageLayout>
  );
}

export default App;
