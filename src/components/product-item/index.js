import { memo, useCallback } from "react";
import './style.css';
import l from '../../languages/lang-rendering';

function ProductItem({ product, addToBasket }) {
    function dateConverter(date) {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        return year.toString()
    }

    const callbacks = {
        addToBasket: useCallback(() => addToBasket(product._id), [addToBasket, product])
    };

    if (!product) {
        return null;
    }

    return (
        <div className='Product'>
            <p>{product.description}</p>
            <p>{l('madeIn')}: <span>{product.madeIn?.title} {`(${product.madeIn?.code})`}</span></p>
            <p>{l('category')}: <span>{product.category?.title}</span></p>
            <p>{l('dateCreate')}: <span>{dateConverter(product.dateCreate)}</span></p>
            <p className='Product-price'>{l('price')}: {product.price} ₽</p>
            <button onClick={() => callbacks.addToBasket(product._id)}>{l('buttonAdd')}</button>
        </div>
    )
}

export default memo(ProductItem);