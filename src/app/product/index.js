import {memo, useCallback, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function Product() {

    const params = useParams();
    const productId = params.id;

    const [product, setProduct] = useState({
        title: null,
        description: null,
        madeIn: {'title': null, 'code': null},
        category: {'title': null},
    });
        
    useEffect(() => {loadProduct(productId)}, [])

    const store = useStore();

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum
      }));

    const callbacks = {
        // Добавляем товар
        addToBasket: useCallback(() => store.actions.basket.addToBasket(productId), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      }

    async function loadProduct(productId) {
        const response = await fetch('/api/v1/articles/' + productId + '/?fields=*,madeIn(title,code),category(title)');
        const json = await response.json();
        setProduct(json["result"]);
    }

    return (
        <PageLayout>
            <Head title={product.title}/>
            <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                <Link to={'/'} style={{'padding': '20px'}}>Главная</Link>
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} navigation={"Главная"}/>
            </div>
            <div className='Product_content' style={{'padding': '20px'}}>
                <p>{product.description}</p>
                <p>Страна производитель: <span className='Product_content__bold'>{product.madeIn.title} ({product.madeIn.code})</span></p>
                <p>Категория: <span className='Product_content__bold'>{product.category.title}</span></p>
                <p>Год выпуска: <span className='Product_content__bold'>{product.edition}</span></p>
                <p className='Product_content__high Product_content__bold'>Цена: {product.price}</p>
                <button onClick={callbacks.addToBasket}>Добавить</button>
            </div>
        </PageLayout>
    );
}

export default memo(Product);
