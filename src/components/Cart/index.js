import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Cart({ list, onActionClick, cartTotalPrice, cartItemCount }) {
  const handleDelete = (code) => {
    onDelete(code);
  };

  return (
    <div>
      <List onActionClick={handleDelete} list={list} actionName="Удалить" />
      <div className="Cart_total">
        <span>Итого </span>
        <span>{cartTotalPrice}</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  cartItemCount: PropTypes.number.isRequired,
};

export default React.memo(Cart);
