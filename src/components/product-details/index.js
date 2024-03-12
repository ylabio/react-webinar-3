import React from 'react';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const ProductDetails = ({ product, addToCart, t }) => {
  const cn = bem('ProductDetails');

  if (!product) {
    return <div className={cn('error')}>{t('productDetailsError')}</div>;
  }

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <p className={cn('description')}>{product.description}</p>
        <p className={cn('country')}>{t('productCountry')}: <span>{product.madeIn.title}</span></p>
        <p className={cn('category')}>{t('productCategory')}: <span>{product.category.title}</span></p>
        <p className={cn('year')}>{t('productYear')}: <span>{product.edition}</span></p>
        <p className={cn('price')}>{t('productPrice')}: <span>{numberFormat(product.price)} ₽</span></p>
      </div>
      <button onClick={() => addToCart(product._id)} className={cn('button')}>{t('buttonAdd')}</button>
    </div>
  );
};

export default ProductDetails;
