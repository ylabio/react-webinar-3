import { useParams } from "react-router";
import { memo, useCallback, useState, useEffect } from "react";
import Article from "../../components/article";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import Head from "../../components/head";
import Menu from "../../components/menu";

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
    }, [id]);

    return (
        <PageLayout>
            <Head title={select.list?.title}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Menu href='/'/>
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
            </div>
            {select.list ? <Article item={select.list} onAdd={callbacks.addToBasket}/> : 'Loading...'}
        </PageLayout>
    )

}

export default memo(ArticleMain);