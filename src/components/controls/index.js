import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import {getTotal} from "../../scripts/getTotal";
import "./style.css";

function Controls({ cart, changeCartVisability }) {
  return (
    <div className="Controls">
      В корзине: 
      <div className="Cost">
        {cart.length
          ? `${cart.length} ${plural(cart.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${getTotal(cart)} ₽`
          : "пусто"}
      </div>{" "}
      <button onClick={() => changeCartVisability()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  changeCartVisability: PropTypes.func,
};

Controls.defaultProps = {
  changeCartVisability: () => {},
};

export default React.memo(Controls);
