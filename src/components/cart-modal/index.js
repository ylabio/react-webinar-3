import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { formatPrice } from "../../utils";
import ModalLayout from "../modal-layout";
import CartItem from "../cart-item";

function CartModal({ cart = [], onClose = () => {}, onRemoveFromCart = () => {}, totalSum = 0 }) {
  return (
    <ModalLayout title="Корзина" onClose={onClose}>
      {cart.length === 0 ? (
        <div className="CartModal-empty">Корзина пуста</div>
      ) : (
        <ul className="CartModal-list">
          {cart.map((item) => (
            <li key={item.code} className={`CartModal-item ${item.code % 2 === 0 ? "CartModal-item-even" : ""}`}>
              <CartItem item={item} onRemoveFromCart={onRemoveFromCart} />
            </li>
          ))}
          <li className="CartModal-last-item">
            <div className="CartModal-item-total-price">
              <div className="CartModal-total-text">
                <span>Итого</span>
                <span>{formatPrice(totalSum)} ₽</span>
              </div>
              <div className="empty"></div>
            </div>
          </li>
        </ul>
      )}
    </ModalLayout>
  )
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired,
};

export default React.memo(CartModal);