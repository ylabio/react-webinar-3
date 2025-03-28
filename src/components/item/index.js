import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({
  item,
  variant = 'default',
  onDelete = () => {},
  onAddToCart = () => {},

}) {

  const defaultCallbacks = {
    onAddToCart: () => {
      onAddToCart(item.code);
    },
  };

  const cartCallbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item.code);
    },

    onAddToCart: () => {
      onAddToCart(item.code);
    },
  };

  if (variant === 'cart') {
    return (
      <div className="Item-cart">
        <div className="Item-title">
          <b>{item.title}</b>
        </div>
        <div className="Item-price-cart">
          <a>{item.quantity} шт</a>
        </div>
        <div className="Item-price-cart">
          <a>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</a>
        </div>
        <div className="Item-actions-cart">
          <button onClick={cartCallbacks.onDelete}>Удалить</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="Item" onClick={defaultCallbacks.onClick}>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">
        <a>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</a>
      </div>
      <div className="Item-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            defaultCallbacks.onAddToCart();
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'cart']),
  onDelete: PropTypes.func,
  onAddToCart: PropTypes.func,
  onSelect: PropTypes.func,
};

export default React.memo(Item);
