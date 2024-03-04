import React, {useCallback} from 'react';
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Controls from "./components/controls";
import List from "./components/list";
import { ITEM_ACTIONS } from './constants/actions';
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { list, cart, total } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),
    onRemoveFromCart: useCallback((item) => {
      store.removeFromCart(item);
    }, [store])
  }

  return (
    <div>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls total={total} openCart={setIsCartOpen} />
        <List list={list} action={ITEM_ACTIONS.ADD_TO_CART} onItemButtonClick={callbacks.onAddToCart}  />
      </PageLayout>
        
      {isCartOpen && 
          <Cart 
            isOpen={isCartOpen} 
            setIsOpen={setIsCartOpen} 
            cart={cart} 
            list={list} 
            onItemButtonClick={callbacks.onRemoveFromCart} 
          />}
    </div>
  );
}

export default App;
