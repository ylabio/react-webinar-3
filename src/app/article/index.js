import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import text from "../../text";
import ProductInfo from "../../components/product-info";
import Loader from "../../components/loader";


function Article() {
    const { id } = useParams();
    const store = useStore();

    useEffect(() => {
            store.actions.catalog.loadProduct(id);
            store.actions.modals.close();
      }, [id]);

    const select = useSelector(state => ({
        product: state.catalog.currentProduct,
        lang: state.language.language || 'ru',
        amount: state.basket.amount,
        sum: state.basket.sum,
      }));
    
    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };

    return (
        <PageLayout>
            <Head title={select.product?.title ?? text[select.lang].loading} />
            <BasketTool 
                openBasket={callbacks.openModalBasket} 
                amount={select.amount} 
                sum={select.sum} 
                text={text[select.lang]}
            />
            {
                select.product ? 
                <ProductInfo 
                description={select.product.description}
                country={select.product.madeIn.title}
                countryCode={select.product.madeIn.code}
                category={select.product.category.title}
                edition={select.product.edition}
                price={select.product.price}
                addToBasket={callbacks.addToBasket}
                id={id}
                text={text[select.lang]}
            /> 
            :
            <Loader />
            }
        </PageLayout>
    );
}

export default Article;