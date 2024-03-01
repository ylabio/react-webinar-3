import React from "react";
import Head from "../head";
import List from "../list";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ cartItems, cartSum, onDelete }) {
  return (
    <div className="Cart">
      <List onAction={onDelete} list={cartItems} action="Удалить" />
      <div className="Cart-sum">
        <div>Итого</div>
        <div>{cartSum} ₽</div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cartSum: PropTypes.number,
  onDelete: PropTypes.func,
};

Cart.defaultProps = {
  onDelete: () => {},
};

export default React.memo(Cart);
