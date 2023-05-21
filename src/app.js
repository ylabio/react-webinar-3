import React, { useCallback } from 'react';
import List from './components/list';
import CartInfo from './components/cart-info';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import { Context } from './context';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
	const cartOpened = store.getState().cartOpen;
	const list = store.getState().list;
	const cartList = store.getState().cartList;
	const quantityItems = cartList.length;
	const summary = cartList.reduce((summ, item) => summ += item.price * item.quant, 0);


	const callbacks = {
		onDeleteFromCart: useCallback((code) => {
			store.deleteFromCart(code);
		}, [store]),

		onAddToCart: useCallback((item) => {
			store.addToCart(item);
		}, [store]),

		toggleModal: useCallback(() => {
			store.toggleModal();
		}, [store])
	}

	return (
		<Context.Provider value={{ cartOpened, summary, quantityItems }}>
			<PageLayout>
				<Head title='Магазин' cartClose={callbacks.toggleModal} />
				<CartInfo cartList={cartList} cartOpen={callbacks.toggleModal} />
				<List list={list} onAdd={callbacks.onAddToCart} />
				<Modal modalActive={cartOpened} onRemove={callbacks.onDeleteFromCart} cartClose={callbacks.toggleModal} list={cartList} />
			</PageLayout>
		</Context.Provider>
	);
}

export default App;
