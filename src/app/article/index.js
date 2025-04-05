import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Basket from '../basket';
import BasketTool from '../../components/basket-tool';
import { useParams } from "react-router";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ArticleInfo from '../../components/article-info';
import LanguageSwitcher from '../../components/language-switcher';


function Article() {
    let { id } = useParams();
    const store = useStore();
    const activeModal = useSelector(state => state.modals.name);

    useEffect(() => {
        store.actions.article.load(id);
    }, [id]);

    const select = useSelector(state => ({
        article: state.article.article,
        amount: state.basket.amount,
        sum: state.basket.sum,
        lang: state.locale.lang,
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        // Выбор языка
        handleLanguageChange: useCallback((lang) => store.actions.locale.setLang(lang), [store])
    };

    return (
        <PageLayout head={<LanguageSwitcher language={select.lang} onChange={callbacks.handleLanguageChange} />}>
            <Head title={select.article.title} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            <ArticleInfo article={select.article} onAdd={callbacks.addToBasket} />
            {activeModal === 'basket' && <Basket />}
        </PageLayout>
    );
}

export default memo(Article);