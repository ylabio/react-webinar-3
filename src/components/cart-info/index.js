import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import { getSum } from "../../utils";

const CartInfo = ({ cart }) => {
  const [sum, setSum] = useState(0);
  const [prodQty, setProdQty] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const sum = getSum(cart);
      setSum(sum);
      setProdQty(cart.length);
    }
  }, [cart]);

  return (
    <div className="CartInfo">
      В корзине:
      <span className="CartInfo-info">
        {cart.length > 0
          ? `${prodQty} ${plural(prodQty, {
              one: "товар",
              few: "товара",
              many: "товаров",
              other: "товара",
            })} / ${sum}`
          : `пусто`}
      </span>
    </div>
  );
};

CartInfo.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
};

export default CartInfo;
