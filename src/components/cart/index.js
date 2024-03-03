import React, { useEffect, useState } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Button from "../button";
import List from "../list";
function Cart(props) {
  const { cart, onCloseCart, onDeleteProductToCart } = props;
  const [isVisible, setIsVisible] = useState(false);
  const cn = bem("Cart");

  // при отрисовке
  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflowY = "hidden";
  }, []);

  const callbacks = {
    // при закрытии
    handleCloseCart: () => {
      setIsVisible(false);
      setTimeout(() => {
        onCloseCart();
        document.body.style.overflowY = "auto";
      }, 199);
    },
  };
  return (
    <div className={` ${cn()} ${isVisible ? cn("visible") : ""}`}>
      <div
        className={` ${cn("wraper")} ${isVisible ? cn("wraper-visible") : ""}`}
      >
        <div className={cn("inner")}>
          <div className={cn("header")}>
            <h2 className={cn("header-title")}>Корзина</h2>
            <Button callback={callbacks.handleCloseCart}>Закрыть</Button>
          </div>
          <div className={cn("list")}>
            <List
              variant="CART"
              list={cart.products}
              action={onDeleteProductToCart}
            />
          </div>
          <div className={cn("total")}>
            <span>Итого</span>
            <span>{cart.totalPrice} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
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
  onCloseCart: PropTypes.func,
  onDeleteProductToCart: PropTypes.func,
};
export default Cart;
