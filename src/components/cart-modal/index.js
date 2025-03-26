import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './style.css';

function CartModal({ cart, onClose, onRemove }) {
  const items = Object.values(cart);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  return createPortal(
    <div className="CartModal-backdrop">
      <div className="CartModal">
        <div className="CartModal-header">
          <span>Корзина</span>
          <button onClick={onClose} className="CartModal-close">
            <img
              src={new URL('src/assets/images/cross-icon.png', import.meta.url).href}
              alt="Крестик"
            />
          </button>
        </div>

        <ul className="CartModal-list">
          {items.map(item => (
            <li key={item.code} className="CartModal-item">
              <span className="CartModal-title">{item.title}</span>
              <div className="CartModal-item-right">
                <div className="CartModal-amount">
                  <span>{item.count} шт</span>
                  <span className="CartModal-price">{item.price * item.count} ₽</span>
                </div>
                <button className="remove-button" onClick={() => onRemove(item.code)}>
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="CartModal-footer">
          <div className="CartModal-total-label">Итого:</div>
          <div className="CartModal-total-value">{totalPrice.toLocaleString()} ₽</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

CartModal.propTypes = {
  cart: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
