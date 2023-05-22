import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { formatNumber } from "../../utils";
import "./style.css";

function CartItem(props) {
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  const cn = bem("CartItem");

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{formatNumber(props.item.price)} ₽</div>
      <div className={cn("count")}>{formatNumber(props.item.count)} шт</div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

CartItem.defaultProps = {};

export default React.memo(CartItem);
