import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartLayout from './components/cart-layout';
import {formatPrice} from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
	const [showCart, setShowCart] = useState(false);

	const list = store.getState().list;
	const cart = store.getState().cart;
	const cartSum = store.getState().cartSum;
	const callbacks = {
		onAddToCart: useCallback(
			(item) => {
				store.addToCart(item);
			},
			[store]
		),

		onDeleteItem: (code) => {
			store.deleteItem(code);
		},
	};

	return (
		<>
			<PageLayout>
				<Head title="Магазин" />
				<Controls cart={cart} cartSum={cartSum} onShowCart={setShowCart} />
				<List
					list={list}
					showCart={showCart}
					onAddToCart={callbacks.onAddToCart}
				/>
			</PageLayout>

			{showCart && (
				<CartLayout>
					<Head
						title={cartSum > 0 ? 'Корзина' : 'Корзина пуста'}
						showCart={showCart}
						onShowCart={setShowCart}
					/>
					<List
						list={cart}
						showCart={showCart}
						onDeleteItem={callbacks.onDeleteItem}
					/>
					{cartSum > 0 && (
						<div className="CartLayout-total">
							Итого <span>{formatPrice(cartSum)}</span> &#8381;
						</div>
					)}
				</CartLayout>
			)}
		</>
	);
}

export default App;
