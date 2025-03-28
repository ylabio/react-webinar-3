import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({
                item,
                onAddToCart = () => {}
              }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{item.price.toLocaleString()} ₽</div>
      <div className="Item-actions">
        <button className="button-add" onClick={() => onAddToCart(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func
};

export default React.memo(Item);
