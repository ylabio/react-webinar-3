import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { formatNumber } from "../../utils";
import CartItem from "../cart-item";
import List from "../list";
import "./style.css";

function Cart({ onDelete, items, itemsSum }) {
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      <List list={items} Item={CartItem} itemProps={{ onDelete: onDelete }} />

      <p className={cn("total")}>
        <span>Итого</span>

        <span>{formatNumber(itemsSum)} ₽</span>
      </p>
    </div>
  );
}

Cart.propTypes = {
  onDelete: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
    }).isRequired
  ),
  itemsSum: PropTypes.number,
};

Cart.defaultProps = {
  items: [],
  itemsSum: 0,
};

export default React.memo(Cart);
