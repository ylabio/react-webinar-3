import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Button from '../../components/button';
import "./style.css";


function Article() {
    const { id } = useParams();
    const store = useStore();

    useEffect(() => {
            store.actions.catalog.loadProduct(id);
            store.actions.modals.close();
      }, [id]);

    const select = useSelector(state => ({
        product: state.catalog.currentProduct,
      }));
    
    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    };

    return (
        <PageLayout>
            <Head title={select.product?.title ?? 'Загрузка...'} />
            <BasketTool />
            <div>
                <p>{select.product?.description ?? 'Загрузка...'}</p>
                <div className="product-info">
                    <div className="product-info-item">
                        <span>Страна производитель:</span>
                        <b>{select.product?.madeIn.title ?? 'Загрузка...'} ({select.product?.madeIn.code ?? ''})</b>
                    </div>
                    <div className="product-info-item">
                        <span>Категория:</span>
                        <b>{select.product?.category.title ?? 'Загрузка...'}</b>
                    </div>
                    <div className="product-info-item">
                        <span>Год выпуска:</span>
                        <b>{select.product?.edition ?? 'Загрузка...'}</b>
                    </div>
                </div>
                <p className="price">Цена: {`${select.product?.price} ₽` ?? 'Загрузка...'}</p>
                <Button style="primary" onClick={() => callbacks.addToBasket(id)} title="Добавить" />
            </div>
        </PageLayout>
    );
}

export default Article;