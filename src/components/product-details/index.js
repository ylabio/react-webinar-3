import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import useTranslate from '../../hooks/useTranslate';
function ProductDetails({ item, onAdd }) {
  const t = useTranslate();
  const cn = bem('ProductDetails');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <>
      <div className={cn()}>
        <p className={cn('description')}>{item.description}</p>

        <div className={cn('specs')}>
          <div className={cn('spec-row')}>
            <span>{t.country}:</span>
            <strong>
              {item.madeIn.title} ({item.madeIn.code})
            </strong>
          </div>

          <div className={cn('spec-row')}>
            <span>{t.category}:</span>
            <strong>{item.category.title}</strong>
          </div>

          <div className={cn('spec-row')}>
            <span>{t.year}:</span>
            <strong>{item.edition}</strong>
          </div>
        </div>

        <div className={cn('price')}>
          <span>
            {t.Price}: {numberFormat(item.price)} ₽
          </span>
        </div>
      </div>
      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </>
  );
}

ProductDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }).isRequired,
    category: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default memo(ProductDetails);
