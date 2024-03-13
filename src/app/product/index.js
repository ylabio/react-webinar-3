
import React, { useCallback, useEffect} from 'react'
import PageLayout from '../../components/page-layout'
import { useParams } from 'react-router'
import Head from '../../components/head'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import ProductLayout from '../../components/product-layout'

function Product() {
    const {id} = useParams()
    const productText = useSelector(state =>state.locale.translations.product);
    const product = useSelector(state => state.product);
    const currLang = useSelector(state => state.locale.lang);
    const store = useStore();

    useEffect(() => {
        store.actions.product.getProduct(id);
    },[id,currLang])

    const callbacks = {
        addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),    
    }

    return (
        <PageLayout
            head={<Head title={product.title}/>}
        >
            <ProductLayout product = {product} text = {productText} addToBasket = {callbacks.addToBasket}/>
        </PageLayout>
    )
}

export default (Product)