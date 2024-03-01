import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} ₽</div>
      {props.item.quantity && (
        <div className="Item-quantity">{props.item.quantity} шт</div>
      )}
      <div className="Item-actions">
        <button onClick={callbacks.onAction}>{props.action}</button>
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
  onAction: PropTypes.func,
};

Item.defaultProps = {
  onAction: () => {},
};

export default React.memo(Item);
