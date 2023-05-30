import React from "react";
import PropTypes from "prop-types";
import { formatText } from "../../utils";
import "./style.css";

export default function ItemCart(item,onAction) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      onAction(item.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-information">
        <p>{formatText(item.price, "₽")}</p>
        <p>{formatText(item.count, "шт")}</p>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAction}>Удалить</button>
      </div>
    </div>
  );
}

