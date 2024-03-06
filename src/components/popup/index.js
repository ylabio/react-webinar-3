import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Popup({ setActive, cart, onDelete }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal-header">
          <h1 className="modal-header__h1">Корзина</h1>
          <button
            onClick={() => {
              setActive((prev) => !prev);
            }}
            className="modal-header__button"
          >
            Закрыть
          </button>
        </div>
        <div className="modal__main">
          {cart.length > 0 ? (
            <ul className="modal-list">
              {cart.map((item, index) => (
                <li key={item.code} className="modal-list__item">
                  <span className="modal-list__item-index">{index + 1}</span>
                  <span className="modal-list__item-name">{item.title}</span>
                  <span className="modal-list__item-price">
                    {new Intl.NumberFormat("ru").format(item.price)} ₽
                  </span>
                  <span className="modal-list__item-num">{item.count} шт</span>
                  <button
                    onClick={() => {
                      onDelete(item);
                    }}
                    className="modal-list__item-delete"
                  >
                    Удалить
                  </button>
                </li>
              ))}
              <li className="modal__footer">
                <span className="modal-footer__total">
                  <b>Итого</b>
                </span>
                <b className="modal-footer__sum">
                  {new Intl.NumberFormat("ru").format(
                    cart.reduce((acc, item) => acc + item.price * item.count, 0)
                  )}{" "}
                  ₽
                </b>
              </li>
            </ul>
          ) : (
            <div className="modal-list__empty">
              <b>Пусто</b>
            </div>
          )}
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
