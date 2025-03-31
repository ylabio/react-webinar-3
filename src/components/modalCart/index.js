import React from 'react';
import Modal from '../modal';
import './style.css';
import { formatPrice, formatPriceWithoutCents } from '../../utils/format';

function ModalCart({ cart, onClose, onRemoveFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal onClose={onClose}>
      <div className="cart-modal-content">
        <h2 className="cart-title">Корзина</h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Корзина пуста</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.code} className="cart-item">
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.title}</span>
                  </div>
                  <div className="cart-item-actions">
                    <span className="cart-item-quantity">{item.quantity} шт</span>
                    <span className="cart-item-sum">
                      {' '}
                      {formatPriceWithoutCents(item.price * item.quantity)}
                    </span>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveFromCart(item.code)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <div className="cart-total-name">Итого:</div>
              <div className="cart-total-sum"> {formatPriceWithoutCents(total)}</div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ModalCart;
