import React from "react";

import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import {formatPrice} from "../../utils";

import "./style.css";

function Cart({children, totalProductCount = 0, totalPrice = 0}) {
  const cn = bem("Cart");

  return <div className={cn()}>
    <div className={totalProductCount ? cn("content") : cn("content--empty")}>
      {children}
    </div>
    {totalProductCount ? <footer className={cn("footer") }>
      <div className={cn("price")}><span className={cn("text")}>Итого:</span> <span
        className={cn("price--full")}>{formatPrice(totalPrice, "ru")}</span></div>
    </footer> : <div className={cn('empty')}>В корзине нет товаров</div>}
  </div>;
}

Cart.propTypes = {
  children: PropTypes.node,
  totalProductCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Cart;
