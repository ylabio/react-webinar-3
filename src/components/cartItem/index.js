import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onRemove }) {
  return (
    <div className="Cart-item">
      <div className="Cart-item-title">{item.title}</div>
      <div className="Cart-item-quantity">{item.quantity} шт.</div>
      <div className="Cart-item-price">{(item.price * item.quantity).toLocaleString()} ₽</div>
      <button className="Cart-item-remove" onClick={() => onRemove(item.code)}>
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default React.memo(CartItem);
