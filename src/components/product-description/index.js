import React from 'react';
import { memo } from 'react';
import Button from '../button';
import PropTypes from 'prop-types';
import './style.css';

function ProductDescription(props) {

  const callbacks = {
    onAdd: e => props.onAdd(props.productId),
  };

  return (
    <div className='ProductDescription'>
        <p class='product_description'>{props.description}</p>
        <div className='product_info'>
            <p>{props.language === 'ru' ? 'Страна производитель:' : 'Country of origin:'}</p>
            <p><span>{props.country}</span></p>
            <p>{props.language === 'ru' ? 'Категория:' : 'Category:'}</p>
            <p><span>{props.category}</span></p>
            <p>{props.language === 'ru' ? 'Год выпуска:' : 'Year of release:'}</p>
            <p><span>{props.edition}</span></p>
            <p className='price_text'>{props.language === 'ru' ? 'Цена:' : 'Price:'}  {props.price} ₽</p>
        </div>

         <Button style="primary" onClick={() => callbacks.onAdd()} title={props.language === 'ru' ? 'Добавить' : 'Add'} />
    </div>
  );
}

ProductDescription.propTypes = {
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  productId: PropTypes.string,
  description: PropTypes.string,
  country: PropTypes.string,
  category: PropTypes.string,
  language: PropTypes.string,
};


export default memo(ProductDescription);