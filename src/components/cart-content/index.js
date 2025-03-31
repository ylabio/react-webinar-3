import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';
import CartItem from '../item/cart-item';

function CartContent({ cart, onRemove }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <>
      <List list={cart} renderItem={item => <CartItem item={item} onRemove={onRemove} />} />
      <div className="CartContent-footer">
        <div className="CartContent-total-label">Итого:</div>
        <div className="CartContent-total-value">{totalPrice.toLocaleString()} ₽</div>
      </div>
    </>
  );
}

CartContent.propTypes = {
  cart: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartContent);
