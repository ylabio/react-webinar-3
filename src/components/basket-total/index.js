import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function BasketTotal({basket}){

  let amount = basket.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="BasketTotal">
      <div>Итого</div>
      <div className="BasketTotal-amount">{amount.toLocaleString()} ₽</div>
    </div>
  )
}

BasketTotal.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func
};

export default React.memo(BasketTotal);
