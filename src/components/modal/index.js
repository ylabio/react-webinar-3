import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import CloseIcon from '../close-icon';
import './style.css';

function CartModal({ cart, onDeleteFromCart, onClose, totalPrice }) {
  return (
    <div className="CartModal">
      <div className="CartModal-content">
        <div className="CartModal-header">
          <h2>Корзина</h2>
          <button onClick={onClose} className="close-button">
            <CloseIcon />
          </button>
        </div>
        <ul className="CartModal-list">
          {/* Преобразуем объект cart в массив */}
          {Object.values(cart).map(item => (
            <li key={item.code} className="CartModal-item">
              <b>{item.title}</b>
              <div>
                <span className="CartModal-span-left">{item.quantity} шт</span>
                <span> {numberFormat(item.price * item.quantity)} ₽</span>
                <button onClick={() => onDeleteFromCart(item.code)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="CartModal-footer">
          <span className="CartModal-span-left">Итого:</span>
          <span>{numberFormat(totalPrice)} ₽</span>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(CartModal);
