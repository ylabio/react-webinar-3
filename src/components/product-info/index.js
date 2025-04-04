import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import Button from '../../components/button';
import useStore from '../../store/use-store';
import useTranslation from '../../hooks/translation-hook';
import './style.css';

function ProductInfo({ product = null }) {
  const store = useStore();
  const translate = useTranslation();

  const callbacks = {
    addToBasket: () => {
      store.actions.basket.addToBasket(product._id);
    },
  };

  return (
    <div className="ProductInfo">
      <p className="ProductInfo-description">
        {product.description || 'Описание товара отсутствует.'}
      </p>
      <div className="ProductInfo-details">
        <div>
          <span className="ProductInfo-label">{translate('productDetails.madeIn')}</span>
          <span className="ProductInfo-value">
            {product.madeIn?.title} ({product.madeIn?.code})
          </span>
        </div>
        <div>
          <span className="ProductInfo-label">{translate('productDetails.category')}</span>
          <span className="ProductInfo-value">{product.category?.title}</span>
        </div>
        <div>
          <span className="ProductInfo-label">{translate('productDetails.edition')}</span>
          <span className="ProductInfo-value">{product.edition}</span>
        </div>
      </div>
      <div className="ProductInfo-price">
        {translate('productDetails.price')} {numberFormat(product.price)} ₽
      </div>
      <Button
        style="primary"
        onClick={callbacks.addToBasket}
        title={translate('button.addButton')}
      />
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
