import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Item from "./components/item";
import PageLayout from "./components/page-layout";
import ItemInCart from './components/itemInCart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const [cartItems, setCartItems] = React.useState([]);
  
  const addToCart = useCallback((item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.code === item.code);

    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }, [cartItems]);

  const removeFromCart = useCallback((itemCode) => {
    const updatedCartItems = cartItems.filter((item) => item.code !== itemCode);
    setCartItems(updatedCartItems);
  }, [cartItems]);

  function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  function calculateUniqueItemCount(cartItems) {
    const uniqueItems = new Set(cartItems.map(item => item.code));
    return uniqueItems.size;
  }

  const totalUniqueItems = calculateUniqueItemCount(cartItems);
  const totalPrice = calculateTotalPrice(cartItems);

  const renderItem = (item) => {
   return <Item item={item} addToCart={addToCart} />
  }

  const renderItemInCart = (item) => {
   return <ItemInCart item={item} removeFromCart={removeFromCart} />
  }



  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls
        items={cartItems}
        totalUniqueItems={totalUniqueItems}
        totalPrice={totalPrice} 
        renderItem={renderItemInCart}
      />
      <List list={list} renderItem={renderItem} />
    </PageLayout>
  );
}

export default App;
