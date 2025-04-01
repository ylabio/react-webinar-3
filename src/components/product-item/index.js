import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProductItem({ code, title, price, onAdd }) {
  const cn = bem('ProductItem');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{title}</b>
      </div>
      <div className={cn('price')}>
        <span>{formatPrice(price)}</span>
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions_add-btn')} onClick={() => onAdd(code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  code: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default React.memo(ProductItem); 