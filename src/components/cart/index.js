import React from "react";
import "./style.css";

function Cart() {

  return (
    <div className="cart">
      <h1 className="cart__title">Корзина </h1>
      <ul className="cart__list">
        <li className="cart__item">
          <span className="cart__item-name">Название товара</span>
          <div className="cart__item-info">
            <span className="cart__item-count">2 шт</span>
            <span className="cart__item-price">100 ₽</span>
            <button className="cart__item-delete">Удалить</button>
          </div>
        </li>
        <li className="cart__item">
          <b className="cart__item-name">Название товара</b>
          <div className="cart__item-info">
            <span className="cart__item-count">1 шт</span>
            <span className="cart__item-price">23 ₽</span>
            <button className="cart__item-delete">Удалить</button>
          </div>
        </li>
      </ul>
      <div className="cart__total">
        <div className="cart__total-info">
          <span className="cart__total-label">Итого:</span>
          <span className="cart__total-value">223 ₽</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Cart)