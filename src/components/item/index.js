import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart, onDeleteFromCart, isInCart, cart }) {
  return (
    <div
      className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      {isInCart &&
        <div className="Item-info">
          {cart[item.code]} шт
        </div>
      }
      <div className="Item-info">
        {item.price} ₽
      </div>
      <div className="Item-actions">
        {isInCart ? (
          <button className="Item-actions-delete" onClick={() => onDeleteFromCart(item.code)}>Удалить</button>
        ) : (
          <button className="Item-actions-add" onClick={() => onAddToCart(item.code)}>Добавить</button>
        )}
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
  onDeleteFromCart: PropTypes.func,
  isInCart: PropTypes.bool,
  cart: PropTypes.objectOf(PropTypes.number),
};

Item.defaultProps = {
  onAddToCart: () => { },
  onDeleteFromCart: () => { },
  isInCart: false,
  cart: {},
};

export default React.memo(Item);
