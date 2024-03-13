import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductPage from '../../components/product-page';

function Product() {
    const store = useStore();

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        product: state.product
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }
    
    return(
        <PageLayout>
            <Head title={select.product.title}/>
            <BasketTool 
                onOpen={callbacks.openModalBasket} 
                amount={select.amount}
                sum={select.sum}
            />
            <ProductPage 
                product={select.product} 
                onAdd={callbacks.addToBasket} 
            />
        </PageLayout>
    )
}

export default memo(Product);