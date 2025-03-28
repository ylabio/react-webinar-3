import React, { useCallback, useState, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/modal'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartTotal = store.getCartTotal();
  const totalItems = store.getCartItemsLength(); 
  const cartList = useMemo(() => list.filter(item => store.getState().cart[item.code]), [list, store]);

  // Не в callbacks, потому что они не меняют state 
  const openCartModal = () => setIsCartOpen(true);
  const closeCartModal = () => setIsCartOpen(false);

  const callbacks = {

    onAddItemToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveItemFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),
  };


  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        openCartModal={openCartModal}
        cartTotal={cartTotal}
        totalItems={totalItems}/>
      <List
        list={list}
        onAddItemToCart={callbacks.onAddItemToCart}
        onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
        isCartMode={false}
      />
      <CartModal 
              isOpen={isCartOpen} 
              onClose={closeCartModal} 
              onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
              cartList = {cartList}
              cartTotal={cartTotal}/>
    </PageLayout>
    
  );
}

export default App;
