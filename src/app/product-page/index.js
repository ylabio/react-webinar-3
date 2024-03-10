import './style.css'
import { memo, useEffect, useState, useCallback } from 'react'
import Head from '../../components/head'
import { Link, useParams } from 'react-router-dom'
import useSelector from '../../store/use-selector'
import useStore from '../../store/use-store'
import item from '../../components/item'
import BasketTool from '../../components/basket-tool'
import Basket from "../basket";
function ProductPage() {

    const { id } = useParams();

    const store = useStore()

    useEffect(() => {
        store.actions.product.getProduct(id)
    }, [id])

    const activeModal = useSelector(state => state.modals.name);

    const select = useSelector(state => ({
        list: state.catalog.list,
        length: state.catalog.length,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
    }

    const product = useSelector(state => state.product).product
    let item;
    if (product) {
        item = product.result
    }
    return (
        <div className='ProductPage'>
            {
                item &&
                (
                    <>
                        <Head title={item.title} />
                        <div className='ProductPage-controls'>
                            <Link to={"/"}>
                                <p>Главная</p>
                            </Link>
                            <BasketTool sum={select.sum} amount={select.amount} onOpen={callbacks.openModalBasket} />
                        </div>
                        <div className='ProductPage-info'>
                            <p className='ProductPage-description'>{item.description}</p>
                            <p className='PructPage-region'>Страна производитель: <strong>{item.madeIn.title} ({item.madeIn.code})</strong></p>
                            <p className='PructPage-category'>Категория: <strong>{item.category.title}</strong></p>
                            <p className='PructPage-year'>Год выпуска: <strong>{item.edition}</strong></p>
                            <p className='PructPage-price'>Цена: {item.price} ₽</p>
                            <button
                            onClick={callbacks.addToBasket}
                            >Добавить</button>
                        </div>

                        {activeModal === 'basket' && <Basket />}
                    </>
                )
            }
        </div>
    )
}

export default memo(ProductPage)