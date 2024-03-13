import { memo, useEffect, useState, useCallback } from 'react'
import Head from '../../components/head'
import { Link, useParams } from 'react-router-dom'
import useSelector from '../../store/use-selector'
import useStore from '../../store/use-store'
import item from '../../components/item'
import BasketTool from '../../components/basket-tool'
import Basket from "../basket";
import PageLayout from '../../components/page-layout'
import MainMenu from '../../components/main-menu'
import ProductInfo from '../../components/product-info'
function ProductPage() {

    const { id } = useParams();
    const store = useStore()



    const select = useSelector(state => ({
        list: state.catalog.list,
        length: state.catalog.length,
        amount: state.basket.amount,
        sum: state.basket.sum,
        activeModal: state.modals.name,
        lang: state.language.language,
        product: state.product
    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
        setLang: useCallback((lang) => store.actions.language.change(lang), [store])
    }


    useEffect(() => {
        const getProduct = async () => {
            const product = await store.actions.product.getProduct(id)
            store.actions.catalog.addItem(product);
        }
        getProduct()
    }, [id])

    return (
        <PageLayout>
                {
                    select.product &&
                    (
                        <>
                            <Head title={select.product.title} selectedLang={select.lang} setLang={callbacks.setLang} />
                            <BasketTool sum={select.sum} amount={select.amount} onOpen={callbacks.openModalBasket} lang={select.lang} />
                            <ProductInfo item={select.product} lang={select.lang} addToBasket={callbacks.addToBasket} />

                            {select.activeModal === 'basket' && <Basket />}
                        </>
                    )
                }
        </PageLayout>
    )
}

export default memo(ProductPage)