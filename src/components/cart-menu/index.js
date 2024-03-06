import React from "react";
import PropTypes from "prop-types";
import { monefy, plural } from "../../utils";
import "./style.css";

function CartMenu({ store, onCartOpen }) {
  const cart = store.getState().cart;

  const count = cart.length;

  const sum = store.sumCartPrices();

  const pluralized = plural(count, {
    one: "товар",
    few: "товара",
    many: "товаров",
  });

  const value = cart.length
    ? `${count} ${pluralized} / ${monefy(sum)}`
    : "пусто";

  return (
    <div className="CartMenu">
      <span className="CartMenu-text">В корзине:</span>
      <span className="CartMenu-value">{value}</span>
      <button className="CartMenu-btn" onClick={onCartOpen}>
        Перейти
      </button>
    </div>
  );
}

CartMenu.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    sumCartPrices: PropTypes.func.isRequired,
  }).isRequired,
  
  onCartOpen: PropTypes.func.isRequired,
};

export default CartMenu;
