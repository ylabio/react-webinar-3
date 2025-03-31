import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({item, addToBasket=() => {}}) {

  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      addToBasket(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
        <span>{item.price.toLocaleString()} ₽</span>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAdd}>Добавить</button>
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
