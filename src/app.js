import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart, isCartOpen} = store.getState();

  const uniqueItemsCount = cart.length;
  
  function getTotalPrice(){
    let totalPrice = 0;
    if(uniqueItemsCount) {
      totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);
    }
    return totalPrice;
  }

  const callbacks = {
    onClickAdd: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

		onClickDelete: useCallback((item) => {
	  	store.deleteFromCart(item);
		}, [store]),

		toggleOpenCloseCart: useCallback(() => {
			store.toggleOpenCloseCart();
		}, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls openCart={callbacks.toggleOpenCloseCart} count={uniqueItemsCount} totalPrice={getTotalPrice()}/>
      <List list={list} 
	  				requiredCallback={callbacks.onClickAdd}
			  		btnName={'Добавить'}/>
	  	{isCartOpen && 
	  	<Cart list={cart} 
	  				onCloseCart={callbacks.toggleOpenCloseCart} 
						totalPrice={getTotalPrice()} 
						requiredCallback={callbacks.onClickDelete}
						btnName={'Удалить'}
						isCartOpen={isCartOpen}
						uniqueItemsCount={uniqueItemsCount}/>}
    </PageLayout>
  );
}

export default App;