import React from "react";
import PropTypes from "prop-types";

import "./style.css";

function Item(props) {
  const { item, price, actionName, onActionClick, quantity, currencySymbol } =
    props;

  const handleAddToCart = () => {
    onActionClick(item.code);
  };
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onActionClick(item.code);
    },
  };

  return (
    <div className={"Item"} onClick={callbacks.onClick}>
      <div className="Item-code"></div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">
        {price} {quantity}
      </div>
      <div className="Item-total">{item.count} {currencySymbol}</div>
      <div className="Item-actions">
        <button onClick={handleAddToCart}>{actionName}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    actionName: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    currencySymbol: PropTypes.string,
    quantity: PropTypes.string,
  }).isRequired,

  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(Item);
