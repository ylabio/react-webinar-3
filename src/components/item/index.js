import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils.js';

function Item({ item, onAddItem = () => {} }) {
  const handleAdd = e => {
    e.stopPropagation();
    onAddItem(item.code, item.title, item.price);
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
        <span>{formatPrice(item.price)}</span>
        <button onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
};

export default React.memo(Item);
