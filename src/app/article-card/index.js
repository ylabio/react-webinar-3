import React, { useCallback, useEffect, memo } from "react";
import {cn as bem} from "@bem-react/classname";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import NavLayout from "../../components/nav-layout";
import Navbar from "../../components/navbar";
import BasketTool from "../../components/basket-tool";
import Article from "../../components/article";
import useStore from "../../store/use-store";
import { useParams } from "react-router-dom";
import useSelector from "../../store/use-selector";


function ArticleCard() {

    const store = useStore();
    const { id } = useParams();
    const cn = bem('Article');

    useEffect(() => {
        store.actions.catalog.load()
        store.actions.article.loadArticleInfo(id)
    },[id])


    const select = useSelector(state => ({
        card: state.article.card,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));


    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }


    return (
        <PageLayout>
            <Head title={select.card.title}/>
            <NavLayout>
                <Navbar/>
                <BasketTool
                onOpen={callbacks.openModalBasket} 
                amount={select.amount} 
                sum={select.sum}
                />
            </NavLayout>
            <Article card={select.card} addToBasket={callbacks.addToBasket}/>
        </PageLayout>
    )
}

export default memo(ArticleCard);