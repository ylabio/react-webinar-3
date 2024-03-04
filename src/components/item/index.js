import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    function: () => {
      props.itemFunction(props.item.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Left-part">
        <div className="Item-code">{props.item.code}</div>
        <div className="Item-title">{props.item.title}</div>
      </div>
      <div className="Rigth-part">
        <div className="Item-price">{props.item.price} ₽</div>
        {props.item.quantity && (
          <div className="Item-quantity">{props.item.quantity} шт.</div>
        )}
        <div className="Item-actions">
          <button onClick={callbacks.function}>{props.button}</button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
