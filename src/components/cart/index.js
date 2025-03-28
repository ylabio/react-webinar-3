import React from "react";
import PropTypes from "prop-types";
import CartItem from '../cart-item';
import CartTotal from '../cart-total'

import "./style.css";

function Cart({ list, totalPrice, removeFromCart}) {

  return (
    <div className="cart">
      <h1 className="cart__title">Корзина</h1>
      <ul className="cart__list">
        {
          list.map((item) => {
            return (
              <li key={item.code} className="cart__item">
                <CartItem item={item} removeFromCart={removeFromCart}/>
              </li>
            )
          })
        }
      </ul>
      <CartTotal totalPrice={totalPrice}/>
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart)