import React from 'react';
import './style.css';

const ItemProduct = () => {
    return (
        <div className='wrapper'>
            <div className='item-desc'>Описание товара из множества букв. Описание товара из букв. В АПИ может быть меньше букв. Описание товара из множества букв.</div>
            <div className='item-block' >Страна производитель: <span>Россия</span></div>
            <div className='item-block' >Категория: <span> Электронника123a</span></div>
            <div className='item-block' >Год выпуска: <span>2015</span></div>
            <div className='item-price'>Цена:  12,57 ₽</div>
            <button className='item-btn' >Добавить</button>
        </div>
    );
};

export default ItemProduct;