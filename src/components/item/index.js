import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = { code: 0, title: '', price: 0 }, onAddToCart = () => {} }) {
  const callbacks = {
    onClick: () => {
      onAddToCart(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <p>{item.price} ₽</p>
      <div className="Item-actions">
        <button onClick={callbacks.onClick}>Добавить</button>
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
