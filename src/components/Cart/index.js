import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Cart({ list, onActionClick, cartTotal, onDelete }) {
  return (
    <div>
      <List
        onActionClick={onActionClick}
        list={list}
        actionName="Удалить"
        onDelete={onDelete}
      />
      <div className="Cart_total">
        <span>Итого </span>
        <span>{cartTotal}</span>
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
};

export default React.memo(Cart);
