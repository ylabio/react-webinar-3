import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Popup({ setActive, cart, onDelete }) {
  return (
    <div className="modal">
      <div className="content">
        <div className="header">
          <h1 className="header__h1">Корзина</h1>
          <button
            onClick={() => {
              setActive((prev) => !prev);
            }}
            className="header__button"
          >
            Закрыть
          </button>
        </div>
        <div className="main">
          {cart.length > 0 ? (
            <ul className="list">
              {cart.map((item, index) => (
                <li key={item.code} className="list__item">
                  <span className="item__index">{index + 1}</span>
                  <span className="item__name">{item.title}</span>
                  <span className="item__price">{item.price} Р</span>
                  <span className="item__num">{item.count} ШТ</span>
                  <button onClick={onDelete} className="item__delete">
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <b>Пусто</b>
            </div>
          )}
        </div>
        <div className="footer">
          <b>
            Итого {cart.reduce((acc, item) => acc + item.price * item.count, 0)}{" "}
            Р
          </b>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  setActive: PropTypes.func,
  onDelete: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(Popup);
