import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onRemove = () => {} }) {
  const callbacks = {
    onRemove: () => {
      onRemove(item.code);
    },
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="CartItem">
      <div className="CartItem-info">
        <div className="CartItem-title">{item.title}</div>
        <div className="CartItem-details">
          <span className="CartItem-quantity">{item.quantity} шт</span>
          <span className="CartItem-total">{itemTotal?.toLocaleString()} ₽</span>
        </div>
      </div>
      <div className="CartItem-actions">
        <button className="CartItem-remove" onClick={callbacks.onRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
};

export default React.memo(CartItem);
