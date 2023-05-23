import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ cart, sum, setActive, onDeleteItem }) {
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
              <div className="Cart-item-code">{item.code}</div>
              <div className="Cart-item-title">{item.title}</div>
              <div className="Cart-item-price">{`${item.price} ₽`}</div>
              <div className="Cart-item-price">{item.amount}шт</div>
              <div className="Cart-item-actions">
                <button onClick={() => onDeleteItem(item.code)}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>Итого {sum}</div>
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
