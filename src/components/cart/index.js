import React from "react";

import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import {formatPrice} from "../../utils";

import "./style.css";

function Cart({children, totalPrice}) {
  const cn = bem("Cart");

  return <div className={cn()}>
    <div className={totalPrice ? cn("content") : cn("content--empty")}>
      {children}
    </div>
    {totalPrice ? <footer className={cn("footer") }>
      <div className={cn("price")}><span className={cn("text")}>Итого:</span> <span
        className={cn("price--full")}>{formatPrice(totalPrice, "ru")}</span></div>
    </footer> : <div className={cn('empty')}>В корзине нет товаров</div>}
  </div>;
}

Cart.propTypes = {
  children: PropTypes.node.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Cart;
