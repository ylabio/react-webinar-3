import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formatPrice } from "../../utils";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    action: (e) => {
      e.stopPropagation();
      props.action(props.item.code);
    },
  };

  return (
    <div className={cn()} >
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${formatPrice(props.item.price)} ₽`}</div>
      {props.item.count && (
        <div className={cn("price")}>{`${props.item.count} шт`}</div>
      )}
      <div className={cn("actions")}>
        <button onClick={callbacks.action}>
          {props.item.count ? "Удалить" : "Добавить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  props:PropTypes.shape({item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  action: PropTypes.func,})
};

Item.defaultProps = {
  action: () => {},
};

export default React.memo(Item);
