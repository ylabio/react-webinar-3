import React from "react";
import PropTypes from "prop-types";
import List from "../list";

import "./style.css";

function Cart({ list, onActionClick, cartTotal, actionName, quantity,currencySymbol }) {
  return (
    <div>
      <List
        onActionClick={onActionClick}
        list={list}
        actionName={actionName}
        quantity={quantity}
        currencySymbol={currencySymbol}
      />
      <div className="Cart_total">
        <span>Итого </span>
        <span>{cartTotal} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      actionName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(Cart);
