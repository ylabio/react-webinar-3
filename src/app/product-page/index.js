import React, { useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Head from '../../components/head';

import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductDetails from '../../components/product-details';
import ProductDetailsTools from '../../components/product-details-tools';

function ProductPage({ isOpen }) {
    const { id } = useParams();

    const store = useStore();
    const selectedProduct = useSelector(state => state.catalog.selectedProduct);
    const { catalog } = store.actions;

    useEffect(() => {
        catalog.load();
    }, []);

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(id => store.actions.basket.addToBasket(id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };

    useEffect(() => {
        catalog.getProduct(id);
    }, [])

    if (!selectedProduct) {
        return (<h1>Загрузка...</h1>)
    }

    return (
        <PageLayout>
            <Head titleKey={selectedProduct.title} />
            <ProductDetailsTools
                handleOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
            />
            <ProductDetails
                desc={selectedProduct.description}
                country={selectedProduct.madeIn.title}
                category={selectedProduct.category.title}
                edition={selectedProduct.edition}
                price={selectedProduct.price}
                handleAddProduct={() => callbacks.addToBasket(id)}
            />
        </PageLayout>
    )
}

export default React.memo(ProductPage);