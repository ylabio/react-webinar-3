import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ModalContent from '../modal-content';
import LogoCloseButton from '../logo-close-button';

function Modal({ isOpen, onClose, cart, totalPrice, onRemoveFromCart }) {
  return (
    <>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal-container'>
            <div className='modal-content'>
              <button className='modal-close-button' onClick={onClose}>
                <LogoCloseButton/>
              </button>
              <h2>Корзина</h2>
              <div className="items-list">
                {cart.map((item) => (
                  <ModalContent
                    key={item.code}
                    title={item.title}
                    count={item.count}
                    price={item.price}
                    onDelete={() => onRemoveFromCart(item.code)}
                  />
                ))}
              </div>
              <div className="modal-footer">
                <span className="total-label">Итого:</span>
                <span className="total-value">{totalPrice} ₽</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};

export default React.memo(Modal);
