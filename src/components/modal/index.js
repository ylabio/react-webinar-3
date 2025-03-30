import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';
import CartItem from '../cartItem';
import { formattedPrice } from '../../utils';

function Modal({ cart, price = 0, onDeleteFromCart, isOpen = false, onClose }) {
  const callbacks = {
    onClose: () => {
      onClose();
    },
  };

  return (
    <>
      {isOpen && (
        <div className="Modal">
          <div className="Modal-content">
            <header className="Modal-header">
              <h2>Корзина</h2>
              <button className="Modal-close-btn" onClick={callbacks.onClose} />
            </header>
            <div className="Modal-body">
              <div className="Modal-list">
                <List list={cart} callback={onDeleteFromCart} component={CartItem} />
              </div>
              <div className="Price">
                <div>
                  <b>Итого:</b>
                </div>
                <div>
                  <b>{formattedPrice(price)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  price: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(Modal);
