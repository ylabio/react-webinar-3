import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart = () => {} }) {
  const callbacks = {
    onAddToCart: () => {
      onAddToCart(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-content">
        <div className="Item-title">
          <b>{item.title}</b>
        </div>
        <div className="Item-price">{item.price?.toLocaleString()} ₽</div>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

export default React.memo(Item);
