import React from "react";
import "./style.css";

function Cart({ active, setActive }) {
  return (
    <div className={active ? "Cart active" : "Cart"}>
      <div className="Cart-content">
        <div className="Cart-header">
          <h1 className="Cart-title">Корзина</h1>
          <button className="Cart-button" onClick={() => setActive(false)}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
