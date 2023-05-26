import { memo, useCallback, useEffect, useState } from "react"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store"
import useSelector from "../../store/use-selector"
import BasketTool from "../../components/basket-tool"
import {cn as bem} from '@bem-react/classname';
import "./style.css"

function Product() {
	const cn = bem('Product');

	const [id, setId] = useState(useParams().id);
	const store = useStore()

	const select = useSelector(state => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
		item: state.catalog.item,
	}))

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(
			() => store.actions.basket.addToBasket(id),
			[store]
		),
		// Открытие модалки корзины
		openModalBasket: useCallback(
			() => store.actions.modals.open("basket"),
			[store]
		),
	}

	useEffect(() => {
		store.actions.catalog.selectItem(id)
	}, [])

	return (
		<PageLayout>
			<Head title={select.item?.title} />
			<BasketTool
				onOpen={callbacks.openModalBasket}
				amount={select.amount}
				sum={select.sum}
			/>
			<div className={cn("Container")}>
				<div className={cn("Text")}>
					{select.item?.description}
				</div>
				<div className={cn("Text")}>
					Страна производитель: <b>{select.item?.madeIn.title}</b>
				</div>
				<div className={cn("Text")}>
					Категория: <b>{select.item?.category.title}</b>
				</div>
				<div className={cn("Text")}>
					Год выпуска: <b>{select.item?.edition}</b>
				</div>
				<div className={cn("Price")}>Цена: {Intl.NumberFormat("ru",{style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(select.item?.price)}</div>
				<button className={cn("Btn")} onClick={callbacks.addToBasket}>Добавить</button>
			</div>
		</PageLayout>
	)
}

export default memo(Product)
