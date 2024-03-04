import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import List from "../list";
import Controls from "../controls";
import { numberFormat } from "../../utils";
import "./style.css";

function Cart({ cart, closeCart, isCartOpen, deleteItem }) {
  const cn = bem("Cart");

  function totalPrice() {
    const price = cart.reduce((sum, obj) => obj.quantity * obj.price + sum, 0);
    return numberFormat(price);
  }
  return (
    <div className={`${cn()} overlay ${isCartOpen ? "overlayVisible" : ""}`}>
      <div className={cn("drawer")}>
        <div className={cn("wrapper-title")}>
          <h2 className={cn("title")}>Корзина</h2>
          <div className={cn("button")}>
            <Controls onClick={closeCart} text="Закрыть" />
          </div>
        </div>

        {cart.length > 0 ? (
          <div>
            <List onClick={deleteItem} items={cart} text="Удалить" />
            <div className={cn("total_price")}>
              <p>Итого</p> <p>{totalPrice()}</p>
            </div>
          </div>
        ) : (
          <h2 className={cn("title")}>Корзина пустая</h2>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      quantity: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  isCartOpen: PropTypes.bool.isRequired,
  closeCart: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
  isCartOpen: false,
  closeCart: () => {},
  deleteItem: () => {},
};

export default React.memo(Cart);