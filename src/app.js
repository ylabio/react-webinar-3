import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartLayout from './components/cart-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
	const [cartProducts, setCartProducts] = useState([]);
	const [cartSum, setCartSum] = useState(0);
	const [showCart, setShowCart] = useState(false);

	const list = store.getState().list;

	const callbacks = {
		onAddToCart: useCallback(
			(code) => {
				const product = store
					.getState()
					.list.find((item) => item.code === code);
				setCartProducts((prev) => {
					const existingProductIndex = prev.findIndex(
						(item) => item.code === product.code
					);

					if (existingProductIndex !== -1) {
						const updatedProducts = [...prev];
						updatedProducts[existingProductIndex] = {
							...updatedProducts[existingProductIndex],
							count: updatedProducts[existingProductIndex].count + 1,
						};
						return updatedProducts;
					}

					return [...prev, {...product, count: 1}];
				});
				setCartSum((prev) => prev + product.price);
			},
			[store]
		),

		onSelectItem: useCallback(
			(code) => {
				store.selectItem(code);
			},
			[store]
		),

		onAddItem: useCallback(() => {
			store.addItem();
		}, [store]),
	};

	return (
		<>
			<PageLayout>
				<Head title="Магазин" />
				<Controls
					cartProducts={cartProducts}
					cartSum={cartSum}
					onShowCart={setShowCart}
				/>
				<List
					list={list}
					showCart={showCart}
					onAddToCart={callbacks.onAddToCart}
					onSelectItem={callbacks.onSelectItem}
				/>
			</PageLayout>

			{showCart && (
				<CartLayout>
          <Head title={cartSum > 0 ? 'Корзина' : 'Корзина пуста'} showCart={showCart} onShowCart={setShowCart} />
					<List list={cartProducts} showCart={showCart} />
					{cartSum > 0 && (
						<div className="CartLayout-total">Сумма: <span>{cartSum}</span> ₽</div>
					)}
				</CartLayout>
			)}
		</>
	);
}

export default App;
