import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import { numberWithSpaces } from "../../utils";

import "./style.css";

function CartInfo({ cartList, totalPrice }) {
  return (
    <div className="Cart-info">
      В корзине:
      {cartList.length > 0 ? (
        <div className="Cart-info__total">{` ${
          cartList.length
            ? ` ${cartList.length} ${plural(cartList.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })}`
            : ""
        } / ${numberWithSpaces(totalPrice)} ₽`}</div>
      ) : (
        <span className="Cart-info__total">пусто</span>
      )}
    </div>
  );
}

CartInfo.propTypes = {
  totalPrice: PropTypes.number,
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,

  onClick: PropTypes.func,
};

export default React.memo(CartInfo);
