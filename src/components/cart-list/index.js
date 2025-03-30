import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';

function CartList({ cartList, onDelete = code => {} }) {
  return (
    <div className="CartList">
      {cartList.map(cartItem => (
        <CartItem key={cartItem.code} cartItem={cartItem} onDeleteItem={onDelete} />
      ))}
    </div>
  );
}

CartList.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      cartQuantity: PropTypes.number,
    }),
  ),
  onDelete: PropTypes.func,
};

export default React.memo(CartList);
