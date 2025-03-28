import React, { useEffect } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';
import CartItem from '../cart-item/cart-item.js';

function Modal({ onClose = () => {}, totalPrice = 0, cart = {}, onDeleteItem = () => {} }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const overlay = document.querySelector('.Modal__overlay');
      if (overlay) {
        overlay.classList.add('Modal__overlay--active');
      }
    }, 2);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Modal__overlay">
      <div className="Modal__container">
        <div className="Modal__header">
          <h3>Корзина</h3>
          <FiX onClick={onClose} className="Modal__close__icon" />
        </div>
        <div className="Modal__body">
          {Object.keys(cart).length > 0 &&
            Object.values(cart).map(item => (
              <CartItem key={item.id} item={item} onDeleteItem={onDeleteItem} />
            ))}
        </div>
        <div className="Modal__footer">
          <b>Итого:</b>
          <b>{totalPrice}₽</b>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ),
  totalPrice: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func,
};

export default Modal;
