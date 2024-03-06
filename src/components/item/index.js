import React from "react";
import Button from "./../button/index";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formaterCurrency } from "../../utils";

function Item(props) {
  const { item, action } = props;
  const { code, title, price } = item;
  const cn = bem("Item");

  const callbacks = {
    handleAction: () => {
      action(code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{code}</div>
      <div className={cn("title")}>{title}</div>
      <div className={cn("price")}>{formaterCurrency(price)}</div>
      <div className={cn("actions")}>
        <Button callback={callbacks.handleAction}>Добавить</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  action: PropTypes.func.isRequired,
};

export default React.memo(Item);
