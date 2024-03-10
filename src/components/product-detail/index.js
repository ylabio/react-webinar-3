import React, {memo, useContext} from 'react';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";
import {LanguageContext} from "../../language-provider.js";

function ProductDetail({ product, addToCart }) {

  const cn = bem('ProductDetail');

  const { wordsTranslate } = useContext(LanguageContext);

  if (!product) {
    return <div className={cn('error')}>Такого товара нет</div>;
  }

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <p className={cn('description')}>{product?.description}</p>
        <p className={cn('category')}>Страна производитель: <b>{product.madeIn?.title}</b></p>
        <p className={cn('category')}> Категория: <b>{product.category?.title}</b></p>

        <p className={cn('category')}>Год выпуска: <b>{product?.edition}</b></p>
        <p className={cn('price')}> Цена {numberFormat(product?.price)} ₽</p>

        <button onClick={() => addToCart(product._id)} className={cn('button')}>{wordsTranslate("buttonAdd")}</button>
      </div>

    </div>
  );
}

ProductDetail.propTypes = {
  addToCart: PropTypes.func.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    })
  }).isRequired,
};

ProductDetail.defaultProps = {
  addToCart: () => {},
}

export default ProductDetail;
