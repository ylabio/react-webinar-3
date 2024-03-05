import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Item(props) {
  const { item, price, onAddToCart, } = props;

  const handleAddToCart = () => {
    onAddToCart(item.code);
  };
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={"Item"} onClick={callbacks.onClick}>
      <div className="Item-code"></div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{price}</div>
      <div className="Item-total">{item.count}</div>
      <div className="Item-actions">
        <button onClick={handleAddToCart}>Добавить</button>
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

  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
