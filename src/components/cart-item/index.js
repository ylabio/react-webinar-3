import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function CartItem({ item, onDelete = () => {} }) {
  const callbacks = {
    onClick: () => {
      onDelete(item.code);
    },
  };

  return (
    <div className="CartItem">
      <div className="CartItem-title">
        <b>{item.title}</b>
      </div>
      <div className="CartItem-actions">
        <span>{item.cartCount} шт</span>
        <span>{item.price} ₽</span>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(CartItem);
