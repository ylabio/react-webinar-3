import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import { formatPrice } from "../../utils";

const CartInfo = ({ sum, cart }) => {
  return (
    <div className="CartInfo">
      В корзине:
      <span className="CartInfo-info">
        {sum > 0 || (sum === 0 && cart.length === 1)
          ? `${cart.length} ${plural(cart.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
              other: "товара",
            })} / ${formatPrice(sum)} ₽`
          : `пусто`}
      </span>
    </div>
  );
};

CartInfo.propTypes = {
  // sum: PropTypes.number.isRequired,
};

export default CartInfo;
