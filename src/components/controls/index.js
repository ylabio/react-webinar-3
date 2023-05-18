import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function Controls(props) {
  const counter = props.basket.length;
  let price = 0;

  if (props.basket.length > 0) {
    price = props.basket.reduce(
      (sum, { price, count }) => sum + price * count,
      0
    );
  }

  return (
    <div className="Controls">
      <span>{props.title}</span>
      <span className="Controls-basket">
        {counter > 0
          ? `${counter} ${plural(counter, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${price} ₽`
          : "пусто"}
      </span>
      <button onClick={() => props.setIsOpen(true)}>{props.caption}</button>
    </div>
  );
}

Controls.propTypes = {
  title: PropTypes.string,
  setIsOpen: PropTypes.func,
};

Controls.defaultProps = {
  setIsOpen: () => {},
};

export default Controls;
