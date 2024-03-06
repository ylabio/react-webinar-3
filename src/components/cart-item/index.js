import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import Controls from "../head/controls";
import "./style.css";

function CartItem({ item, onClick, text }) {
  const cn = bem("Cart-item");
  const price = numberFormat(item.price);

  const handleClick = () => {
    onClick(item.code);
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{price}</div>
      {item.quantity && (
        <div className={cn("quantity")}>{item.quantity}&nbsp;шт</div>
      )}
      <div className={cn("actions")}>
        <Controls onClick={handleClick} text={text} />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

CartItem.defaultProps = {
  text: "Click",
};

export default React.memo(CartItem);
