import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPriceWithCurrency } from '../../utils';

function CartItem({ title, count, price, onDelete }) {
  return (
    <div className='product-item'>
      <div className='product-info'>
        <span className='product-name'>{title}</span>
      </div>
      <div className='product-details'>
        <span className='quantity'>{count} шт</span>
        <span className='price'>{formatPriceWithCurrency(price)}</span>
        <button
          className='delete-button'
          onClick={onDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default React.memo(CartItem);
