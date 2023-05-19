import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function Controls({ totalCartPrice, onShowCart, cart }) {
  return (
    <div className="Controls">
      <div className="Controls-cart">
        В корзине:
        <div className="Controls-cartDetails">
          {cart.length > 0
            ? `${cart.length} ${plural(cart.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${totalCartPrice}₽`
            : "пусто"}
        </div>
      </div>
      <button onClick={() => onShowCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onShowCart: PropTypes.func,
};

Controls.defaultProps = {
  onShowCart: () => {},
};

export default React.memo(Controls);
