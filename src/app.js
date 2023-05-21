import React, { useCallback, useState } from "react"
import List from "./components/list"
import Controls from "./components/controls"
import Head from "./components/head"
import PageLayout from "./components/page-layout"
import Item from "./components/item"
import Modal from "./components/modal"
import Basket from "./components/basket"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
	const [modalShow, setModalShow] = useState(false);

	const list = store.getState().list
	const basket = store.getState().basket
	const totalPrice = store.getTotalPrice()

	const callbacks = {
		addToBasket: useCallback(
			code => {
				store.addToBasket(code)
			},
			[store]
		),
		deleteOnBasket: useCallback(
			code => {
				store.deleteOnBasket(code)
			},
			[store]
		),
	}

	return (
		<PageLayout>
			<Head title="Магазин" />
			<Controls basket={basket} totalPrice={totalPrice} setModalShow={setModalShow} />
			<List>
				{list.map(item => 
					<Item key={item.code} item={item} onAdd={callbacks.addToBasket} />
				)}
			</List>

			{modalShow ? 
				<Modal title="Корзина" setModalShow={setModalShow}>
					<Basket basket={basket} deleteOnBasket={callbacks.deleteOnBasket} totalPrice={totalPrice}  />
				</Modal> 
			: null}
		</PageLayout>
	)
}

export default App
