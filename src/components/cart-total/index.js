import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getTypeOfNumber } from "../../utils";

function CartTotal({ fullAmount = 0, amountOfProducts = 0, subtitle='' }) {
  return amountOfProducts ? (
    <div className="CartTotal-price">
      <span>Итого:</span>
      <span>{getTypeOfNumber(fullAmount)} ₽</span>
    </div>
  ) : (
    <div className="CartTotal-empty">{subtitle}</div>
  );
}

CartTotal.propTypes = {
  subtitle: PropTypes.string.isRequired,
  amountOfProducts: PropTypes.number.isRequired,
  fullAmount: PropTypes.number.isRequired,
};

export default React.memo(CartTotal);
