import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item";
import "./style.css";

function Cart({ onDelete, totalCartPrice, cart, showCart }) {
  return (
    <div className="cart">
      <div className="cart-header">
        Корзина
        <button onClick={() => showCart()}>Закрыть</button>
      </div>
      <div className="cart-items">
        {cart.map((el) => {
          return <CartItem onDelete={onDelete} cartEl={el} key={el.code} />;
        })}

        <div className="cart-totalPrice">Итого {totalCartPrice} ₽</div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  showCart: PropTypes.func,
  cart: PropTypes.array,
};

Cart.defaultProps = {
  showCart: () => {},
};

export default Cart;
