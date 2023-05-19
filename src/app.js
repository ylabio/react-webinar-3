import React, { useCallback } from 'react';
import List from "./components/list";
import CartInfo from "./components/cart-info";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

	const list = store.getState().list;
	const cart = store.getState().cart;

	const callbacks = {
		onDeleteFromCart: useCallback((code) => {
			store.cart.deleteFromCart(code);
		}, [store]),

		onAddToCart: useCallback((item) => {
			store.addToCart(item);
		}, [store])
	}

	return (
		<PageLayout>
			<Head title='Магазин' />
			<CartInfo cart={cart} />
			<List list={list} onRemove={callbacks.onDeleteFromCart}
				onAdd={callbacks.onAddToCart} />
		</PageLayout>
	);
}

export default App;
