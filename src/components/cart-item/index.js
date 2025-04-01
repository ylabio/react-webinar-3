import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onRemove }) {
  return (
    <div className='Cart-item'>
      <div className="Cart-item-name">{item.title}</div>
      <div className="Cart-item-details">
        <span>{item.quantity} шт</span>
        <div className="Cart-item-price">
          <span>{item.price} ₽</span>
          <button
            className="Cart-item-remove"
            onClick={() => onRemove(item.code)}
            aria-label={`Удалить ${item.title}`}
          >
            Удалить
          </button>
        </div>
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
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
