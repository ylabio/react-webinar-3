import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname"
import './style.css';

function ShoppingItem(props) {
  const cn = bem("ShoppingItem");
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
        <p className={cn("price")}>{`${price.toLocaleString()} ₽`}</p>
        <p className={cn("quantity")}>{`${quantity} шт`}</p>
      </div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onClick}>
          Удалить
        </button>
      </div>
    </div >
  );
}

ShoppingItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

ShoppingItem.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(ShoppingItem);
