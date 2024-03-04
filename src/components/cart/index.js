import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Cart = () => {
  const totalPrice = 100;
  if (!totalPrice) {
    return <div className="cart-empty">Корзина пуста!</div>;
  }

  return (
    <div className="cart">
      <header>Корзина</header>
      <ul>
        <li>Название товара</li>
      </ul>
      <div>Итого: 400р</div>
    </div>
  );
};

export default Cart;
