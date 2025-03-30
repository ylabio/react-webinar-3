import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils';

function Item({ item, onAddToCart = () => {} }) {
  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation()
      onAddToCart(item.code)
    },
  };

  return (
    <div
      className='Item'
    >
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">
        {formatPrice(item.price)} ₽
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>В корзину</button>
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