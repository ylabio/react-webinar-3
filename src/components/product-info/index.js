import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import Button from '../../components/button';
import './style.css';

function ProductInfo({ product = null, translations, addToBasket }) {
  return (
    <div className="ProductInfo">
      <p className="ProductInfo-description">
        {product.description || 'Описание товара отсутствует.'}
      </p>
      <div className="ProductInfo-details">
        <div>
          <span className="ProductInfo-label">{translations.madeIn}</span>
          <span className="ProductInfo-value">
            {product.madeIn?.title} ({product.madeIn?.code})
          </span>
        </div>
        <div>
          <span className="ProductInfo-label">{translations.category}</span>
          <span className="ProductInfo-value">{product.category?.title}</span>
        </div>
        <div>
          <span className="ProductInfo-label">{translations.edition}</span>
          <span className="ProductInfo-value">{product.edition}</span>
        </div>
      </div>
      <div className="ProductInfo-price">
        {translations.pric} {numberFormat(product.price)} ₽
      </div>
      <Button style="primary" onClick={addToBasket} title={translations.buttonText} />
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }),
};

export default memo(ProductInfo);
