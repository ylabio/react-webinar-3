import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css'

export const CatalogItem = () => {
    const [itemData, setItemData] = useState();
    const store = useStore();
    const {id} = useParams();

    const select = useSelector(state => ({
        list: state.catalog.list,
        totalItems: state.catalog.totalItems,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    useEffect(() => {
        store.actions.catalog.load();
    }, [])

    useEffect(() => {
        store.actions.catalog.getProductData(id).then(result => setItemData(store.getState().catalog.openedItem)) ;
    }, [id])

    return <PageLayout>
        {
            itemData && <>
        <Head title={itemData.title}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
            <div className='Catalog-item'>
            <p className={'Catalog-data'}>{itemData.description}</p>
            <p className={'Catalog-data'}>Страна производитель: <b>{itemData.madeIn.title}({itemData.madeIn.code})</b></p>
            <p className={'Catalog-data'}>Категория: <b>{itemData.category.title}</b></p>
            <p className={'Catalog-data'}>Год выпуска: <b>{itemData.edition}</b></p>
            <p className={'Catalog-price'}>Цена: {itemData.price}</p>
    <button onClick={() => callbacks.addToBasket(id)}>Добавить</button>
            </div>
            </>
        }
    </PageLayout>
}