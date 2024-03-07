import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";
import controls from "../controls";
import Controls from "../controls";

function Item({ item, onAddToCart }) {
  const callbacks = {
    onAddToCart: () => {
      onAddToCart(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="price-actions">
        {item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} &#8381;
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Item);
