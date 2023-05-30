import { memo } from "react";
import './style.css';

function ProductItem({ product, addToBasket }) {
    const info = {
        'Название': product.category?.title,
        'Описание': product.description,
        'Цена': product.price,
        'Страна': product.madeIn?.title,
        'Год': product.edition
    }
    console.log(info);

    return (
        <div className='Product'>
            <p>{product.description}</p>
            <p>Страна производитель: <span>{product.madeIn?.title} {`(${product.madeIn?.code})`}</span></p>
            <p>Категория: <span>{product.category?.title}</span></p>
            <p>Год выпуска: <span>{product.edition}</span></p>
            <p className='Product-price'>Цена: {product.price} ₽</p>
            <button onClick={() => addToBasket(product._id)}>Добавить</button>
        </div>
    )
}

export default memo(ProductItem);