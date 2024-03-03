import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import { formatNumber } from "../../utils";
import List from "../list";
import "./style.css";

const Cart = ({ cart, onRemoveFromCart }) => {
  const cn = bem("Cart");

  return cart.items.length ? (
    <div className={cn()}>
      <List
        items={cart.items}
        onButtonClick={onRemoveFromCart}
        buttonText={"Удалить"}
      />
      <div className={cn("total")}>
        <div>Итого</div>
        <div>{formatNumber(cart.totalPrice)} ₽</div>
      </div>
    </div>
  ) : (
    <div className={cn("empty")}>
      Корзина пуста. Пожалуйста, добавьте товар :)
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);
