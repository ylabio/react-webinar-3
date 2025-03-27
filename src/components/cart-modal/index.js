import React from "react"
import PropTypes from "prop-types"
import "./style.css"
import { formatPrice } from "../../utils"

function CartModal({ cart = [], onClose = () => {}, onRemoveFromCart = () => {}, totalSum = 0 }) {
  return (
    <div className="CartModal-overlay">
      <div className="CartModal">
        <div className="CartModal-header">
          <h2>Корзина</h2>
          <button className="CartModal-close" onClick={onClose}></button>
        </div>

        {cart.length === 0 ? (
          <div className="CartModal-empty">Корзина пуста</div>
        ) : (
          <>
            <ul className="CartModal-list">
              {cart.map((item) => (
                <li key={item.code} className="CartModal-item">
                  <div className="CartModal-item-info">
                    <div className="CartModal-item-title">
                      <b>{item.title}</b>
                    </div>
                    <div className="CartModal-item-price">
                      <span>{item.quantity} шт</span>
                      <span>{item.price} ₽</span>
                    </div>
                  </div>
                  <button className="CartModal-item-remove" onClick={() => onRemoveFromCart(item.code)}>
                    Удалить
                  </button>
                </li>
              ))}
            </ul>

            <div className="CartModal-total">Итого: {formatPrice(totalSum)} ₽</div>
          </>
        )}
      </div>
    </div>
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
}

export default React.memo(CartModal)

