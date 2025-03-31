import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numberWithSpaces } from '../../utils';

function Item({
    onAddToCart = () => {},
    item = [],
}) {

  const callbacks = {
    onAdd: () => {
      onAddToCart(item.code);
    },
  };

  return (
    <div
      className={'Item'}
    >
      <div className="Item-title">
        <b>{item.title}</b>
        <span>{numberWithSpaces(item.price)} ₽</span>
      </div>
      <div className="Item-actions">
        <button onClick={() => callbacks.onAdd(item.code)}>Добавить</button>
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
  onAdd: PropTypes.func,
  onSelect: PropTypes.func,
};

export default React.memo(Item);
