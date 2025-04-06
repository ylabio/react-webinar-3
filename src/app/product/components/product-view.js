import PropTypes from 'prop-types';
import '../style.css';
import Button from '../../../components/button';
import { numberFormat } from '../../../utils';

function ProductView({ product, onBack, onAdd, onOpenBasket, amount, sum, t }) {
  return (
    <div className="Product">
      <p className="Product-description">{product.description || t('noDescription')}</p>

      <div className="Product-info">
        {product.madeIn?.title && (
          <div className="Product-row">
            <div className="Product-label">{t('manufacturer')}:</div>
            <div className="Product-value">
              {product.madeIn.title} ({product.madeIn.code})
            </div>
          </div>
        )}

        {product.category?.title && (
          <div className="Product-row">
            <div className="Product-label">{t('category')}:</div>
            <div className="Product-value">{product.category.title}</div>
          </div>
        )}

        {product.edition && (
          <div className="Product-row">
            <div className="Product-label">{t('year')}:</div>
            <div className="Product-value">{product.edition}</div>
          </div>
        )}
      </div>

      <div className="Product-price">
        {t('price')}: {numberFormat(product.price)} ₽
      </div>

      <Button style="primary" onClick={onAdd} title={t('add')} />
    </div>
  );
}

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  onAdd: PropTypes.func,
  onOpenBasket: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default ProductView;
