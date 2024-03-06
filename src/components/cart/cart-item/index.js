import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { formatPrice } from "../../../utils";

const CartItem = ({ id, itemData, onDelete }) => {
  const priceContent =
    itemData.totalPrice === 0
      ? "бесплатно"
      : `${formatPrice(itemData.totalPrice)} ₽`;

  return (
    <li className="CartItem">
      <span className="CartItem-number">{id}</span>
      <p className="CartItem-title">{itemData.title}</p>
      <span className="CartItem-price">{priceContent}</span>
      <span className="CartItem-count">{itemData.quantity} шт</span>

      <button
        onClick={() => {
          onDelete();
        }}
      >
        Удалить
      </button>
    </li>
  );
};

CartItem.propTypes = {
  id: PropTypes.number,
  itemData: PropTypes.shape({
    price: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
