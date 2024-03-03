import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { formatNumber, plural } from "../../utils";
import "./style.css";

function Controls({ cart, onOpenCart }) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <p className={cn("info")}>
        В корзине:{" "}
        <span>
          {cart.items.length
            ? `${cart.items.length} ${plural(cart.items.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${formatNumber(cart.totalPrice)} ₽`
            : "пусто"}
        </span>
      </p>
      <button className={cn("button")} onClick={onOpenCart}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      })
    ),
    totalPrice: PropTypes.number,
  }).isRequired,
};

Controls.defaultProps = {};

export default React.memo(Controls);
