import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatPrice, plural } from '../../utils';
import './style.css';

function Item({ item, onAddToCart }) {

  const callbacks = {
    onAddToCart: () => {
      onAddToCart(item.code);
    }
  };

  return (
    <div
      className="Item"
    >
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      
      <div className="Item-container">
        <span className="Item-price">
          {` ${formatPrice(item.price)}`}
        </span>
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};


export default React.memo(Item);
