import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { cn } from '@bem-react/classname';

function ProductCard({ productInfo, addToBasket = () => {}, localText }) {
  const productCard = cn('ProductCard');

  return (
    <div className={productCard()}>
      <div className={productCard('description')}>{productInfo.description}</div>
      <div className={productCard('item')}>
        <div className={productCard('prop')}>{localText.countryOrigin}:</div>
        <div
          className={productCard('value')}
        >{`${productInfo.madeIn?.title} (${productInfo.madeIn?.code})`}</div>
      </div>
      <div className={productCard('item')}>
        <div className={productCard('prop')}>{localText.category}:</div>
        <div className={productCard('value')}>{productInfo.category?.title}</div>
      </div>
      <div className={productCard('item')}>
        <div className={productCard('prop')}>{localText.yearManufacture}:</div>
        <div className={productCard('value')}>{productInfo.edition}</div>
      </div>
      <div className={productCard('price')}>
        {localText.price}: {productInfo.price} ₽
      </div>
      <Button style="primary" onClick={() => addToBasket(productInfo._id)} title={localText.add} />
    </div>
  );
}

ProductCard.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    edition: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
  }).isRequired,
  addToBasket: PropTypes.func,
};

export default memo(ProductCard);
