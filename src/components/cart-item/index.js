import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem({ code, title, price, quantity, onDelete }) {
  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b>{title}</b>
      </div>
      <div className={cn('quantity')}>
        <span>{quantity} шт</span>
      </div>
      <div className={cn('price')}>
        <span>{formatPrice(price)}</span>
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions_remove-btn')} onClick={() => onDelete(code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  code: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(CartItem); 