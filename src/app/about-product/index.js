import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import HeadBottom from '../../components/head-bottom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Product from '../../components/product';
import './style.css';

function AboutProduct() {
	const store = useStore();
  let { userAboutId } = useParams();
	const product = useSelector((state) => state.product.product);

	useEffect(() => {
		store.actions.product.getOneProduct(userAboutId);
	}, [userAboutId]);


  const select = useSelector((state) => ({
		list: state.catalog.list,
		amount: state.basket.amount,
		sum: state.basket.sum,
	}));

  const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
	};


	return (
		<PageLayout>
			<Head title={product.title}/>
			<HeadBottom onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<Product product={product} addToBasket={callbacks.addToBasket}/>
		</PageLayout>
	);
}

export default React.memo(AboutProduct)
