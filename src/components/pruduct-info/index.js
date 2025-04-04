import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function ProductInfo({ product, onAdd }) {
  const cn = bem('ProductInfo');

  return (
    <article className={cn()}>
      <p className={cn('description')}>{product.description}</p>
      <div className={cn('info')}>
        <div className={cn('info-left')}>
          <p>Страна производитель:</p>
          <p>Категория:</p>
          <p>Год выпуска:</p>
        </div>
        <div className={cn('info-right')}>
          <p>
            {product.madeIn.title} ({product.madeIn.code})
          </p>
          <p>{product.category.title}</p>
          <p>{product.edition}</p>
        </div>
      </div>
      <h2 className={cn('price')}>Цена: {product.price} ₽</h2>
      <div className={cn('actions')}>
        <Button style="primary" onClick={() => onAdd(product._id)} title="Добавить" />
      </div>
    </article>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ProductInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ProductInfo);
