import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onRemove }) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
        <div className="CartItem-details">
          <span className="Item-count">{item.count} шт</span>
          <span className="Item-count-price">{(item.price * item.count).toLocaleString()} ₽</span>
        </div>
        <button className="cart" onClick={() => onRemove(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
