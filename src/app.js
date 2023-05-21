import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartLayout from './components/cart-layout';
import Footer from './components/footer';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = list.filter(item => item.count > 0);
  const totalPrice = store.getState().totalPrice;

  const [isCartOpened, setIsCartOpened] = useState(false);

  const callbacks = {

    onOpenCart: () => {
      setIsCartOpened(prev => !prev)
    },

    onDeleteCartItem: useCallback((item) => {
      store.deleteCartItem(item);
    }, [store]),

    onAddCartItem: useCallback((item) => {
      store.addCartItem(item);
    }, [store]),
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onOpenCart={callbacks.onOpenCart}
              cartItemsAmount={cart.length} 
              cartItemsPrice={totalPrice}/>
        <List list={list}
              onAddCartItem={callbacks.onAddCartItem}/>
      </PageLayout>
      <CartLayout isOpened={isCartOpened}
            onOpenCart={callbacks.onOpenCart}>
        <Head title='Корзина'
              button='Закрыть'
              onOpenCart={callbacks.onOpenCart}/>
        <List list={cart}
              onDeleteCartItem={callbacks.onDeleteCartItem}/>
        <Footer totalPrice={totalPrice}/>
      </CartLayout>
    </>
    
  );
}

export default App;
