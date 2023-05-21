import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import BasketItem from "../basket-item";
import "./style.css";
import List from "../list";

function Basket({ basket, onDeleteItemFromBasket }) {
  const cn = bem("Basket");

  return (
    <div className={cn()}>
      {basket.length > 0 || (
        <div className={cn("empty")}>Добавьте товары в корзину</div>
      )}
      <List
        list={basket}
        handler={onDeleteItemFromBasket}
        Component={BasketItem}
      />
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      selected: PropTypes.bool,
      count: PropTypes.number,
    })
  ).isRequired,
  onDeleteItemFromBasket: PropTypes.func,
};

Basket.defaultProps = {
  onDeleteItemFromBasket: () => {},
};

export default React.memo(Basket);
