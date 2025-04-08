import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ProductDetails({ product, onAddToCart, t }) {
  return (
    <div className="product-details">
      {product && (
        <div className="product-info">
          <div className="product-description">
            <a>{product.description || 'Нет описания'}</a>
          </div>
          <div className="product-country">
            <span>Страна производителя: </span>
            <b>{product.madeIn?.title || 'Не указана'}</b>
          </div>
          <div className="product-category">
            <span>Категория:</span>
            <b>{product.category?.title || 'Не указана'}</b>
          </div>
          <div className="product-year">
            <span>Год выпуска:</span>
            <b>{product.year || 'Не указан'}</b>
          </div>
          <div className="product-price">
            <span><b>Цена: </b></span>
            <b>{numberFormat(product.price)} ₽</b>
          </div>
          <Button
            style="primary"
            onClick={onAddToCart}
            title={t('addToCart')}
          />
        </div>
      )}
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    year: PropTypes.string,
    price: PropTypes.number,
  }),
  onAddToCart: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(ProductDetails);
