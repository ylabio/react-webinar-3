import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ProductItem(props) {
  const cn = bem('ProductItem');

  const { item, category, country } = props.product;

  const callbacks = {
    onAdd: e => props.onAdd(item._id),
  };

  return (
    item &&
    <div className={cn()} id={item._id}>
      <p className={cn('description')}>{item.description}</p>

      <div className={cn('parameter')}>
        <span className={cn('parameter-title')}>Категория:</span>
        <span className={cn('parameter-text')}>{country.title}({country.code})</span>
      </div>

      <div className={cn('parameter')}>
        <span className={cn('parameter-title')}>Страна производитель:</span>
        <span className={cn('parameter-text')}>{category}</span>
      </div>

      <div className={cn('parameter')}>
        <span className={cn('parameter-title')}>Год выпуска:</span>
        <span className={cn('parameter-text')}>{item.edition}</span>
      </div>

      <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />

    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  country: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  category: PropTypes.string,
  onAdd: PropTypes.func,
};

ProductItem.defaultProps = {
  onAdd: () => { },
};

export default memo(ProductItem);
