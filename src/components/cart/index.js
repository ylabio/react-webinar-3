import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CancelIcon from '../shared/icons/cancel-icon';
import CartList from '../cart-list';

function Cart({ cartItems, totalPrice, onClose = () => {}, onDeleteItem = () => {} }) {
  return (
    <div className="Cart">
      <button onClick={onClose}>
        <CancelIcon />
      </button>

      <h1 className="Cart-title">Корзина</h1>

      <CartList items={cartItems} totalPrice={totalPrice} onDeleteItem={onDeleteItem} />
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  totalPrice: PropTypes.number,
  onClose: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Cart);
