import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Button from '../../components/button';
import "./style.css";
import text from "../../text";


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
      }));
    
    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    };

    return (
        <PageLayout>
            <Head title={select.product?.title ?? text[select.lang].loading} />
            <BasketTool />
            <div>
                <p>{select.product?.description ?? text[select.lang].loading}</p>
                <div className="product-info">
                    <div className="product-info-item">
                        <span>{text[select.lang].originCountry}</span>
                        <b>{select.product?.madeIn.title ?? text[select.lang].loading} ({select.product?.madeIn.code ?? ''})</b>
                    </div>
                    <div className="product-info-item">
                        <span>{text[select.lang].category}</span>
                        <b>{select.product?.category.title ?? text[select.lang].loading}</b>
                    </div>
                    <div className="product-info-item">
                        <span>{text[select.lang].releaseYear}</span>
                        <b>{select.product?.edition ?? text[select.lang].loading}</b>
                    </div>
                </div>
                <p className="price">{text[select.lang].price} {`${select.product?.price} ₽` ?? text[select.lang].loading}</p>
                <Button style="primary" onClick={() => callbacks.addToBasket(id)} title={text[select.lang].addButton} />
            </div>
        </PageLayout>
    );
}

export default Article;