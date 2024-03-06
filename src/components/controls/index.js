import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "./../../utils";
import { blur } from "../Cart";


let fn = (cart, total) => {
  if (cart.length > 0) {
    return (
      <div>
        В корзине:
        <b>
          {`${cart.length} ${plural(cart.length, {
            one: "товар",
            few: "товара",
            many: "товаров",
          })} / ${new Intl.NumberFormat("ru").format(total)} \u20BD`}
        </b>
      </div>
    );
  } else {
    return (
      <div>
        В корзине: <b>пусто</b>
      </div>
    );
  }
};

function Controls({ cart, itogo, total, removeItem }) {

  return (
    <div className="Controls">
      <div>{fn(cart, total)}</div>
      <button onClick={() => blur()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {

  total: PropTypes.number,
  cart: PropTypes.object.isRequired,
};



export default React.memo(Controls);
