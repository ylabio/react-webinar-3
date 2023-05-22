import React, { useCallback } from 'react';
import List from './components/list';
import CartInfo from './components/cart-info';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Item from './components/item';
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
	const summary = store.getState().cartSummary;

	const callbacks = {

		onDeleteFromCart: useCallback((code) => {
			store.deleteFromCart(code);
		}, [store]),

		onAddToCart: useCallback((item) => {
			store.addToCart(item);
		}, [store]),

		toggleCart: useCallback(() => {
			store.toggleCart();
		}, [store]),
	}

	return (
		<PageLayout>
			<Head title='Магазин' toggleCartOpen={callbacks.toggleCart} />
			<CartInfo cartList={cartList} toggleCartOpen={callbacks.toggleCart} summary={summary} quantityItems={quantityItems} />
			<List modalActive={cartOpened} >
				{list.map(item =>
					<Item key={item.code} item={item} onAdd={callbacks.onAddToCart} />
				)}
			</List>
			<Modal modalActive={cartOpened} onRemove={callbacks.onDeleteFromCart} toggleCartOpen={callbacks.toggleCart} list={cartList} summary={summary} />
		</PageLayout>
	);
}

export default App;
