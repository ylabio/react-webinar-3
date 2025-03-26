import React from 'react';
import CartItem from '../cart-item';
import './style.css';
import PropTypes from 'prop-types';

function Cart({ cart = [], cartPrice = 0, onDelete = () => {} }) {
  return cart.length !== 0 ? (
    <ul className="Cart">
      {cart.map(item => (
        <li className="Cart-item" key={item.code}>
          <CartItem item={item} onDelete={onDelete} />
        </li>
      ))}
      <li className="Cart-item Cart-item--total">
        <>
          <span>Итого</span>
          <span>{cartPrice} ₽</span>
        </>
      </li>
    </ul>
  ) : (
    <div className="Cart">
      <h3>Корзина пуста</h3>
    </div>
  );
}
Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ),
  onDelete: PropTypes.func,
  cartPrice: PropTypes.number.isRequired,
};

export default React.memo(Cart);
