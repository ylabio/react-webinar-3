import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import List from '../list';
import CartItem from '../cart-item';
import CloseIcon from '../close-icon';
import './style.css';

function Cart({ cart, onDeleteFromCart, onClose, totalPrice }) {
  return (
    <div className="Cart">
      <div className="Cart-header">
        <h2>Корзина</h2>
        <button onClick={onClose} className="Close-button">
          <CloseIcon />
        </button>
      </div>
      <List
        list={cart}
        renderItem={item => <CartItem item={item} onDeleteFromCart={onDeleteFromCart} />}
      />
      <div className="Cart-footer">
        <span className="span-left">Итого:</span>
        <span>{numberFormat(totalPrice)} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Cart);
