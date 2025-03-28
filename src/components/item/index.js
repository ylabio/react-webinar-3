import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({
  item = {
    code: '',
    title: '',
    price: 0,
    count: 1,
  },
  onAddProductToBasket = () => {},
}) {
  const callbacks = {
    onAddProduct: e => {
      e.stopPropagation();
      onAddProductToBasket(item.code, item.title, item.price, item.count);
    },
  };

  return (
    <div className="Item-content">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
        <span>{item.price} ₽</span>
        <button onClick={callbacks.onAddProduct}>Добавить</button>
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
  onAddProductToBasket: PropTypes.func.isRequired,
};

export default React.memo(Item);
