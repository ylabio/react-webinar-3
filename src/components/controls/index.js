import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Controls({ onOpenModal, cartTotalPrice, cartItemCount }) {
  const handleClick = () => {
    onOpenModal();
  };
  return (
    <div className="Controls">
        <div className="Controls_content">
          <div>В корзине:</div>
          <p>
          {cartItemCount ? (
              `${cartItemCount} ${plural(cartItemCount, {
                one: "товар ",
                few: "товара ",
                many: "товаров ",
              })} / ${cartTotalPrice} ₽`
            ) : "Пусто"}
          </p>
        </div>
      

      <button onClick={handleClick}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  cartItemCount: PropTypes.number.isRequired,
};

Controls.defaultProps = {
  onOpenModal: () => {},
  cartTotalPrice: 0,
  cartItemCount: 0,
};

export default React.memo(Controls);
