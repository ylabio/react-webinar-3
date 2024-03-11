import { useParams } from "react-router";
import { memo, useCallback, useState, useEffect } from "react";
import Article from "../../components/article";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import Head from "../../components/head";

function ArticleMain() {

    const { id } = useParams();

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
    }, []);

    return (
        <PageLayout>
            <Head title={select.list?.title}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                sum={select.sum}/>
            <Article item={select.list} onAdd={callbacks.addToBasket}/>
        </PageLayout>
    )

}

export default memo(ArticleMain);