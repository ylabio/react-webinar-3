import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname"
import Button from "./button";
import './style.css';

function Item(props) {
  const cn = bem("Item");
  const { code, title, quantity, price } = props.item;
  const callbacks = {
    onClick: () => {
      props.onClick(code);
    },
  }

  return (
    <div className={cn()}>
      <div className={cn("code")}>{code}</div>
      <div className={cn("title")}>
        {title}
      </div>
      <div className={cn("info")}>
        <p className={cn("price")}>{`${price} ₽`}</p>
        {quantity && <p className={cn("quantity")}>{`${quantity} шт`}</p>}
      </div>
      <div className={cn("actions")}>
        <Button onClick={callbacks.onClick}>
          {props.action}
        </Button>
      </div>
    </div >
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Item);
