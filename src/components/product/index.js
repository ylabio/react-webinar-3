import React, { memo } from 'react';
import './style.css'

function Product({product, addToBasket}) {
	return (
		<div className="Product">
			<p className="Product-desc">{product.description}</p>
			<div className="Product-country">
				Страна производитель:<b>{product?.madeIn?.title} ({product?.madeIn?.code})</b>
			</div>
			<div className='Product-category'>Категория: <b>{product?.category?.title}</b></div>
			<div className='Product-year'>Год выпуска: <b>{product.edition}</b></div>
			<div className='Product-price'><b>Цена: {product.price} ₽</b></div>
			<button onClick={() => addToBasket(product._id)}>Добавить</button>
		</div>
	);
};

export default memo(Product)