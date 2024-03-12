
import React, { useCallback, useEffect, useState } from 'react'
import PageLayout from '../../components/page-layout'
import { redirect, useParams } from 'react-router'
import Head from '../../components/head'
import {cn as bem} from "@bem-react/classname"
import "./style.css"
import { numberFormat } from '../../utils'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'

function Product() {
    const cn = bem("Product")
    const {id} = useParams()
    const [{title,madeIn,category,edition,price,description},changeProduct] = useState({})
    const {countryOfOrigin: countryOfOriginText,category: categoryText, yearOfIssue : yearOfIssueText,price : priceText,add : addText} = useSelector(state =>state.locale.translations.product);
    const store = useStore();

    const callbacks = {
        addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),    
    }

    useEffect(() => {
        const getProduct = async () => {
            if(!id) redirect("/")
            const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,{
                headers: {
                        'Accept-Language': store.getState().locale.lang
                }
            });
            const json = await response.json();
            changeProduct(json.result)
        }

        getProduct()
    },[id,countryOfOriginText])


    return (
        <PageLayout
            head={<Head title={title}/>}
        >
            <div className={cn("content")}>
            <p>{description}</p>
            <p>{countryOfOriginText}: <b>{madeIn?.title} ({madeIn?.code})</b></p>
            <p>{categoryText}: <b>{category?.title}</b></p>
            <p>{yearOfIssueText}: <b>{edition}</b></p>
            <h1>{priceText}: {numberFormat(price)} ₽</h1>
            <button onClick={callbacks.addToBasket}>{addText}</button>
            </div>       
        </PageLayout>
    )
}

export default (Product)