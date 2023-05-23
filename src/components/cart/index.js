import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { calculateSum } from "../../utils";

function Cart({ cart, setActive, onDeleteItem }) {
  return (
    <div>
      <div className="Cart-header">
        <div>Корзина</div>
        <button onClick={() => setActive()}>Закрыть</button>
      </div>
      <div className="List">
        {cart.map((item) => (
          <div key={item.code} className="List-item">
            <div className="Item">
              <div className="Item-code">{item.code}</div>
              <div className="Item-title">{item.title}</div>
              <div className="Item-price">{`${item.price} ₽`}</div>
              <div className="Item-price">{item.amount}шт</div>
              <div className="Item-actions">
                <button onClick={() => onDeleteItem(item.code)}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        Итого{" "}
        {cart.length > 0
          ? calculateSum(cart.map((item) => item.price * item.amount))
          : 0}
      </div>
    </div>
  );
}

Cart.propTypes = {
  setActive: PropTypes.func,
};

Cart.defaultProps = {
  setActive: () => {},
};

export default React.memo(Cart);
