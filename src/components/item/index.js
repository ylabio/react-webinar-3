import React from "react";
import Button from "./../button/index";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formaterCurrency } from "../../utils";

function Item(props) {
  const cart = "CART";
  const { item, action, variant } = props;
  const { code, title, price, count } = item;
  const cn = bem("Item");

  const callbacks = {
    handleAction: (e) => {
      e.stopPropagation();
      action(item);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{code}</div>
      <div className={cn("title")}>{title}</div>
      <div className={cn("price")}>{formaterCurrency(price)}</div>
      {variant === cart && <div className={cn("count")}>{`${count} шт`}</div>}
      <div className={cn("actions")}>
        <Button callback={callbacks.handleAction}>
          {variant === cart ? "Удалить" : "Добавить"}
        </Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
  variant: PropTypes.string,
};

Item.defaultProps = {
  action: () => {},
};

export default React.memo(Item);
