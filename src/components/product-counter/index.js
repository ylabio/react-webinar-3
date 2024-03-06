import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural, formaterCurrency } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import Button from "../button/index";

function ProductCounter({ cart, onOpenCart }) {
  const cn = bem("Product-counter");

  return (
    <div className={cn()}>
      <div className={cn("text")}>
        <span className={cn("label")}>В корзине </span>
        {cart.products.length ? (
          <span className={cn("details")}>
            {`${cart.products.length} `}
            {plural(cart.products.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })}
            {` / ${formaterCurrency(cart.totalPrice)}`}
          </span>
        ) : (
          <span className={cn("details")}>пусто</span>
        )}
      </div>
      <Button className={cn("action")} callback={onOpenCart}>
        Перейти
      </Button>
    </div>
  );
}

ProductCounter.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      })
    ).isRequired,
    totalPrice: PropTypes.number,
  }).isRequired,
  onOpenCart: PropTypes.func,
};

ProductCounter.defaultProps = {
  onOpenCart: () => {},
};

export default React.memo(ProductCounter, (prevProps, nextProps) => {
  return (
    prevProps.cart.products.length === nextProps.cart.products.length &&
    prevProps.cart.totalPrice === nextProps.cart.totalPrice
  );
});
