import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";
import "./style.css";

function Item({ item, renderButton }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{formatPrice(item.price)}</div>
      {item.quantity && <div className="Item-quantity">{item.quantity} шт</div>}
      <div className="Item-actions">{renderButton(item)}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  renderButton: PropTypes.func,
};

Item.defaultProps = {
  renderButton: () => {},
};

export default React.memo(Item);
