import PropTypes from 'prop-types';
import React from 'react';
import List from '../list';
import './style.css';

function Cart({ cart, onRemoveFromCart = () => {}, totalPrice = 0 }) {
  const callbacks = {
    onRemoveFromCart: code => {
      onRemoveFromCart(code);
    },
  };

  return (
    <div className="Cart">
      <List list={cart} buttonAction={callbacks.onRemoveFromCart} buttonText={'Удалить'} />
      <div className="Cart-footer">
        Итого: <span>{totalPrice} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }).isRequired,
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.string,
};

export default React.memo(Cart);
