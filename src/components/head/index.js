import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { plural, numberFormat } from "../../utils";
import Controls from "../controls";
import "./style.css";

function Head({ cart, text, openCart }) {
  const cn = bem("Head");

  function getLastLetter(count) {
    return plural(count, {
      one: "товар",
      few: "товара",
      many: "товаров",
    });
  }

  function totalPrice() {
    const price = cart.reduce((sum, obj) => obj.quantity * obj.price + sum, 0);
    return numberFormat(price);
  }

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>{text}</h1>
      <div className={cn("info")}>
        <div className={cn("info-cart")}>
          В&nbsp;корзине:{" "}
          <span className="bold">
            {cart.length > 0
              ? `${cart.length} ${getLastLetter(cart.length)} / ${totalPrice()}`
              : "пусто"}
          </span>
        </div>
        <div className={cn("info-actions")}>
          <Controls text="Перейти" onClick={openCart} />
        </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  text: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number,
      price: PropTypes.number,
    }).isRequired
  ),
  openCart: PropTypes.func.isRequired,
};

export default React.memo(Head);