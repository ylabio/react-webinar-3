import BasketTool from "../../components/basket-tool";
import React, {useCallback, useEffect, memo} from "react";
import ProductInfo from "../../components/product-info";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

function Product(props) {
	
	const store = useStore();
	
	useEffect(() => {
		store.actions.product.load(props.idProduct);
	}, [])
	
	const select = useSelector(state => ({
		item: state.product.item,
		amount: state.basket.amount,
		sum: state.basket.sum
	}));
	
	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
	}
	
	return (
		<PageLayout>
			<Head title={select.item.title} setLang={props.setLang}/>
			<BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
			            sum={select.sum} lang={props.lang}/>
			<ProductInfo onAdd={callbacks.addToBasket} item={select.item} lang={props.lang}/>
		</PageLayout>
	)
}

export default memo(Product);