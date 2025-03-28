import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ item, onRemoveFromCart }) {
  const handleRemove = () => {
    onRemoveFromCart(item.code); // Удаляем элемент по его коду
  };

  return (
    <div className="CartItem">
      <div className="CartItem-details">
        <span className="CartItem-name">{item.title}</span>
        <span className="CartItem-quantity">{item.quantity} шт.</span>
        <span className="CartItem-price">{(item.price * item.quantity).toFixed(2)} ₽</span>
      </div>
      <button className="CartItem-remove" onClick={handleRemove}>
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);