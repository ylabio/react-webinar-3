import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";

function CartTotal( {totalPrice}) {
  return (
    <div className="cart__total">
      <div className="cart__total-info">
        <span className="cart__total-label">Итого:</span>
        <span className="cart__total-value">{`${formatPrice(totalPrice)}`}</span>
      </div>
    </div>
  )
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default React.memo(CartTotal)