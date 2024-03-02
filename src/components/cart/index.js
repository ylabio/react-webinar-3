import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartItem from "../cart-item/index";
import { formatSum } from "../../utils";
import './style.css';

function Cart({ cartItems, totalPrice, removeItemFromCart }) {

  const cn = bem('Cart');

  return (
    <div>
      {cartItems.map((item, index) => <CartItem item={item} removeItemFromCart={removeItemFromCart} key={index} />)}
      <div className={cn('total')}>
        <div className={cn('total-title')}>Итого</div>
        <div className={cn('total-price')}>{formatSum(totalPrice, { style: 'currency', currency: 'RUB' })}</div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(Object),
  totalPrice: PropTypes.number,
  removeItemFromCart: PropTypes.func
};

Cart.defaultProps = {
  cartItems: [],
  totalPrice: 0,
  removeItemFromCart: () => {
  }
}

export default React.memo(Cart);
