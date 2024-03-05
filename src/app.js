import React, {useCallback, useState, useMemo} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import CartModal from './components/cart-modal'
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal-layout";
import ItemProduct from './components/item-product'
import ItemCart from './components/item-cart'
import {formatNumber} from './utils'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartQuantity = store.countItemsInCart();
  const cartTotalPrice = store.totalPriceInCart();
  const list = store.getState().list;
  const cart = store.getState().cart; 

  const pageTitle = 'Магазин';  

  const formattedTotalPrice = useMemo(() => {
    return formatNumber(cartTotalPrice);
  }, [cartTotalPrice]);

  const callbacks = {
    addItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    removeItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store])    
  }    
 
  return (
    <PageLayout>
      <Head title={pageTitle}/>
      <Controls setIsVisible={setIsCartVisible} 
                cartQuantity={cartQuantity} 
                cartTotalPrice={formattedTotalPrice}/>
      <List list={list}
            onActionType={callbacks.addItemToCart}            
            renderItem={(props) => <ItemProduct {...props} />} />
      <ModalLayout isVisible={isCartVisible} onClose={() => setIsCartVisible(false)}> 
        <CartModal  
              cartTotalPrice={formattedTotalPrice} 
              cartQuantity={cartQuantity} 
              onClose={() => setIsCartVisible(false)}>
          <List list={cart}
            onActionType={callbacks.removeItemFromCart}            
            renderItem={(props) => <ItemCart {...props} />} />
        </CartModal>
      </ModalLayout>      
    </PageLayout>
  );
}

export default App;
