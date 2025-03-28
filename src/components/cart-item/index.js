import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils';

function CartItem({ item, onDelete = () => {} }) {

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDelete(item.code);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
        <div className="Item-info">
          <p>{item.count} шт</p>
          <p>{formatPrice(item.price)}</p>
        </div>
        <button onClick={callbacks.onDelete} className="Item-delete">Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(CartItem);
