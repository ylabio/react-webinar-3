import React from "react";
import { plural } from "../../utils";
import PropTypes from "prop-types";
import "./style.css";
import Popup from "../popup/index";

function Controls({ cart, onDeleteFromCart }) {
  const [modalActive, setModalActive] = React.useState(false);
  return (
    <div className="Controls">
      <div>
        В корзине:
        {cart.length > 0 ? (
          <>
            <b className="info">
              {cart.length + " "}
              {plural(cart.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })}
              &nbsp;/&nbsp;
              {cart.length > 0
                ? cart.reduce((acc, item) => acc + item.price * item.count, 0)
                : ""}
              ₽
            </b>
          </>
        ) : (
          <>
            <b className="empty">пусто</b>
          </>
        )}
      </div>
      <button
        onClick={() => setModalActive((prev) => !prev)}
        className="open-modal"
      >
        Перейти
      </button>
      {modalActive ? (
        <Popup
          active={modalActive}
          setActive={setModalActive}
          cart={cart}
          onDelete={onDeleteFromCart}
        />
      ) : (
        ""
      )}
    </div>
  );
}

Controls.propTypes = {
  onDeleteFromCart: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(Controls);
