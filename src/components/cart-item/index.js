import React from "react";
import "./style.css";
import PropTypes from "prop-types";

function CartItem({ item, removeFromCart }) {
  return (
    <>
      <span className="cart__item-name">{item.title}</span>
      <div className="cart__item-info">
        <span className="cart__item-count">{`${item.quantity} шт`}</span>
        <span className="cart__item-price">{`${item.price.toLocaleString('ru-RU')} ₽`}</span>
        <button className="cart__item-delete" onClick={() => removeFromCart(item.code)}>Удалить</button>
      </div>
    </>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);