import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import CartInfo from './components/cartInfo';
import { calculateCartTotal } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [cartIsOpened, setCartIsOpened] = useState(false)

  const storeItems = store.getState().list;
  const cartItems = store.getState().cart;

  const { totalQuantity, totalPrice } = calculateCartTotal(cartItems)

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),
    toggleCartVisibility: () => {
      setCartIsOpened(!cartIsOpened)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenCart={callbacks.toggleCartVisibility}>
        <CartInfo totalQuantity={totalQuantity} totalPrice={totalPrice}/>
      </Controls>
      <List
        itemsList={storeItems}
        itemButtonsAction={callbacks.onAddItemToCart}
        itemButtonsName={'Добавить'}
      />
      <Cart
        itemButtonsAction={callbacks.onRemoveItemFromCart}
        itemsList={cartItems}
        cartIsOpened={cartIsOpened}
        toggleCartVisibility={callbacks.toggleCartVisibility}
      />
    </PageLayout>
  );
}

export default App;
