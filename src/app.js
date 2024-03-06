import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart, uniqueItemsCount, totalPrice, isCartOpen} = store.getState();

  const callbacks = {
    onClickAdd: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

		onClickDelete: useCallback((code) => {
	  	store.deleteFromCart(code);
		}, [store]),

		toggleOpenCloseCart: useCallback(() => {
			store.toggleOpenCloseCart();
		}, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls openCart={callbacks.toggleOpenCloseCart} count={uniqueItemsCount} totalPrice={totalPrice}/>
      <List list={list} 
	  				requiredCallback={callbacks.onClickAdd}
			  		btnName={'Добавить'}/>
	  	{isCartOpen && 
	  	<Modal modalTitle='Корзина' onCloseCart={callbacks.toggleOpenCloseCart} >
				<Cart list={cart} 
							totalPrice={totalPrice} 
							requiredCallback={callbacks.onClickDelete}/>
			</Modal>}
    </PageLayout>
  );
}

export default App;