import PropTypes from 'prop-types';
import '../style.css';
import Button from '../../../components/button';

function ProductView({ product, onAdd, t }) {
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
        {t('price')}: {' ' + product.price} ₽
      </div>

      <Button style="primary" onClick={onAdd} title={t('add')} />
    </div>
  );
}

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default ProductView;
