import React from "react";
import PropTypes from "prop-types";
import { monefy, plural } from "../../utils";
import "./style.css";

function CartMenu({ cartList, onCartOpen }) {
  const count = cartList.length;

  const sum = cartList.reduce((acc, product) => {
    return (acc += (product.price * product.count));
  }, 0);

  const pluralized = plural(count, {one: 'товар', few: 'товара', many: 'товаров'}) 

  const value = cartList.length ? `${count} ${pluralized} / ${monefy(sum)}` : 'пусто'

  return (
    <div className="CartMenu">
      <span className="CartMenu-text">В корзине:</span>
      <span className="CartMenu-value">{value}</span>
      <button className="CartMenu-btn" onClick={onCartOpen}>Перейти</button>
    </div>
  );
}

CartMenu.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  onCartOpen: PropTypes.func.isRequired
}


export default CartMenu;
