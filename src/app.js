import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const list = store.getState().list;
  const {productsAmount, totalPrice, products} = store.getState().cart;

  const callbacks = {
    onCartOpen: useCallback(() => {
    setIsCartOpen(true);
     // для фиксированного фона под модалкой
     document.body.style.position = 'fixed'; 
    }, [isCartOpen, setIsCartOpen]),

    onCartClose: useCallback(() => {
     setIsCartOpen(false);
     document.body.style.position = 'static';
    }, [isCartOpen, setIsCartOpen]),

    onCartAdd: useCallback((code) => {
      store.addInCart(code);
    }, [store]),

    onCartRemove: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    renderItem: useCallback((item) => {
      return (<Item item={item} onCartAdd={callbacks.onCartAdd}/>);
    }, []),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls productsAmount={productsAmount} totalPrice={totalPrice} onCartOpen={callbacks.onCartOpen}/>
      <List list={list} renderItem={callbacks.renderItem}/>
      {isCartOpen &&
        <Cart
          products={products}
          totalPrice={totalPrice}
          onClose={callbacks.onCartClose}
          onCartRemove={callbacks.onCartRemove}
        />}
    </PageLayout>
  );
}

export default App;
