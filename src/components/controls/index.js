import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import CartInfo from "../cart-info";

function Controls({ onOpenCart, cartList, totalPrice }) {
  return (
    <div className="Controls">
      <CartInfo cartList={cartList} totalPrice={totalPrice} />

      <button className="Controls__button" onClick={() => onOpenCart()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func,
};

Controls.defaultProps = {
  onClick: () => {},
};

export default React.memo(Controls);
