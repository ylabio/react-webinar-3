import React, { useCallback } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { formaterCurrency } from "./../../utils";
import { cn as bem } from "@bem-react/classname";
import List from "../list";
import ItemCart from "../item-cart";

function Cart(props) {
  const { cart, onDeleteProductToCart } = props;
  const cn = bem("Cart");

  const callbacks = {
    renderItem: useCallback(
      (item) => {
        return (
          <ItemCart
            key={item.code}
            item={item}
            action={onDeleteProductToCart}
          />
        );
      },
      [cart.products]
    ),
  };

  return (
    <>
      <div className={cn("list")}>
        <List list={cart.products} renderItem={callbacks.renderItem} />
      </div>
      <div className={cn("total")}>
        <span>Итого</span>
        <span>{formaterCurrency(cart.totalPrice)}</span>
      </div>
    </>
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
  onDeleteProductToCart: PropTypes.func.isRequired,
};
export default Cart;
