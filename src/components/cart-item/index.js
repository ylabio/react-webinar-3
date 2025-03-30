import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { formatPrice } from "../../utils";

/**
 * Компонент элемента корзины
 */
function CartItem({ item, onRemoveFromCart }) {
  return (
    <div className="CartItem">
      <b>{item.title}</b>
      <div className="CartItem-actions">
        <div className="CartItem-price">
          <span>{item.quantity} шт</span>
          <span>{formatPrice(item.price)} ₽</span>
        </div>
        <button className="CartItem-remove" onClick={() => onRemoveFromCart(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);

