import { useParams } from "react-router";
import { memo, useCallback, useState, useEffect, Suspense } from "react";
import Article from "../../components/article";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import Head from "../../components/head";
import Menu from "../../components/menu";
import Locale from "../../components/locale";
import Header from "../../components/header";

function ArticleMain() {

    const { id, lang } = useParams();

    const store = useStore();

    const select = useSelector(state => ({
        list: state.article.list,
        amount: state.basket.amount,
        sum: state.basket.sum
      }));

    const callbacks = {
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id, true), [store]),
    }

    useEffect(() => {
        store.actions.article.load(id);
    }, [id]);

    return (
        <PageLayout>
            <Header left={<Head title={select.list?.title}/>} right={<Locale lang={lang}/>} dark={true}/>
            <Header left={<Menu href={`/${lang}/`} lang={lang}/>} right={
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} lang={lang}/>} dark={false}/>
            <Suspense fallback={<div>Loading...</div>}>
                {select.list ? <Article item={select.list} onAdd={callbacks.addToBasket} lang={lang}/> : <div>Loading...</div>}
            </Suspense>
        </PageLayout>
    )

}

export default memo(ArticleMain);