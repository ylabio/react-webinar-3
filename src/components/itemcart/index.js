import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";
import "./style.css";

function ItemCart(props) {
  const { item, price, actionName, onActionClick, currencySymbol } = props;

  const formattedPrice = formatPrice(price);

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
    <div className={"ItemCart"} onClick={callbacks.onClick}>
      <div className="ItemCart-code"></div>
      <div className="ItemCart-title">{item.title}</div>
      <div className="ItemCart-price">{formattedPrice}</div>
      <div className="ItemCart-count"> {item.count}</div>
      <div className="ItemCart-symbol">{currencySymbol}</div>
      <div className="ItemCart-actions">
        <button onClick={handleAddToCart} className="ItemCart-actions-button">
          {actionName}
        </button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    actionName: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    currencySymbol: PropTypes.string,
  }).isRequired,

  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(ItemCart);
