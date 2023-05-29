import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Item from "../../components/item";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDescription from '../../components/item-description';
import { useParams } from 'react-router-dom';

function Product() {

    const store = useStore();
    const {id} = useParams();

    useEffect(() => {
        store.actions.product.load(id);
    }),[id];

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
            <Head title={select.item.title}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <ItemDescription onAdd={callbacks.addToBasket} item={select.item} />
        </PageLayout>
    );
}

export default memo(Product);