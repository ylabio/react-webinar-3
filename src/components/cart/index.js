import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import CartHeader from '../cart-header';
import CartFooter from '../cart-footer';
import './style.css';

function Cart({ cart, onDeleteFromCart, onClose, totalPrice }) {
  return (
    <div className="Cart">
      <CartHeader onClose={onClose} />
      <List
        list={cart}
        renderItem={item => <CartItem item={item} onDeleteFromCart={onDeleteFromCart} />}
      />
      <CartFooter totalPrice={totalPrice} />
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
