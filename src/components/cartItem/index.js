import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item = {}, onRemove = () => { } }) {
  if (item.count === 0) return null;
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
        <div className="Item-details">
          <span>{item.count} шт</span>
          <span className="Item-price">{(item.price).toLocaleString('ru')} &#8381;</span>
        </div>
      </div>
      <div className="Item-actions">
        <button onClick={() => onRemove(item.code)} className="Item-deleteButton">Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartItem);