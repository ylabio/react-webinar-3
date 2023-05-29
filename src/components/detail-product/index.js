import React, {memo} from 'react';
import {numberFormat} from "../../utils";

const DetailProduct = ({data, addToBasket}) => {
  const itemId = data._id
  const { description, madeIn, edition, price, category } = data || {};
  const country = madeIn ? madeIn.title : " ";
  const countryCode = madeIn ? madeIn.code : " ";
  const nameCategory = category ? category.title : " ";
  return (
    <>
      <div className='details'>
        <p className='description'>{description}</p>
        <p className='country'>Страна производитель: <span>{country} ({countryCode})</span></p>
        <p className='category'>Категория: <span>{nameCategory}</span></p>
        <p className='year'>Год выпуска: <span>{edition}</span></p>
        <p className='price'>Цена: {numberFormat(price)} ₽</p>
        <button onClick={()=>addToBasket(itemId)}>Добавить</button>
      </div>
    </>
  );
};

export default memo(DetailProduct);