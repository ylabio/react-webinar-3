import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CancelIcon from '../shared/icons/cancel-icon';
import CartList from '../cart-list';

function CartModal({
  cartItems,
  totalPrice,
  isOpen = false,
  onClose = () => {},
  onDeleteItem = () => {},
}) {
  if (!isOpen) return null;

  return (
    <div className="CartModal" onClick={onClose}>
      <div className="CartModal-container" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>
          <CancelIcon />
        </button>

        <h1 className="CartModal-title">Корзина</h1>

        <CartList items={cartItems} totalPrice={totalPrice} onDeleteItem={onDeleteItem} />
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(CartModal);
