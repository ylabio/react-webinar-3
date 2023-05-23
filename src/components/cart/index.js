import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Price from "../price";
import Item from "../item";
import List from "../list";

function Cart({cart, onDelete, total}) {
  return (
    <>
      <div className="Cart-body">
        {cart.length > 0 && (
          <List list={cart} onClick={onDelete} isCartItem={true} />
        )}
        {cart.length === 0 && "Корзина пуста"}
      </div>
      <div className="Cart-footer">
        {cart.length > 0 && (
          <div className="Cart-total">
            <span>Итого</span>
            <Price price={total}></Price>
          </div>
        )}
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  onDelete: PropTypes.func,
  total: PropTypes.number,
};

Cart.defaultProps = {
  cart: [],
  onDelete: () => {},
  total: 0,
};

export default Cart;
