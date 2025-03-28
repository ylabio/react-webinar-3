import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import close from '../../assets/close-cart.png';

function CartModal({
  items = [],
  isOpen = false,
  onClose = () => {},
  onRemove = () => {}
}) {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="Cart-modal-overlay" onClick={onClose}>
      <div className="Cart-modal" onClick={e => e.stopPropagation()}>
        <h3>Корзина</h3>
        <button className="Cart-close" onClick={onClose}>
          <img src={close} alt='close icon' />
        </button>
        <div className="Cart-items">
          {items.length > 0 ? (
            <>
              {items.map(item => (
                <div key={`${item.code}-${item.quantity}`} className="Cart-item">
                  <div className="Cart-item-name">{item.title}</div>
                  <div className="Cart-item-details">
                    <span>{item.quantity} шт</span>
                    <div className="Cart-item-price">
                      <span>{item.price} ₽</span>
                      <button
                        className="Cart-item-remove"
                        onClick={() => onRemove(item.code)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="Cart-total">
                <div>
                  <span>Итого:</span>
                  <span>{totalAmount} ₽</span>
                </div>
              </div>
            </>
          ) : (
            <div className="Cart-empty">Корзина пуста</div>
          )}
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onRemove: PropTypes.func,
};

export default React.memo(CartModal);
