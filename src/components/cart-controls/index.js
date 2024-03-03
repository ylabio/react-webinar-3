import React from "react";
import PropTypes from 'prop-types';
import "./style.css";
import { plural } from "../../utils";

function CartControls({ onOpenModalCart, amountCart, totalCartPrice }) {
  const amountContent = amountCart === 0 ? 
  "пусто" : 
  `${amountCart} ${plural(amountCart, {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  })} ${totalCartPrice === 0 ? "" : `/ ${totalCartPrice} ₽`}`;

  return (
    <div className="CartControls">
      <span>В корзине: <span className="CartControls-amount">{amountContent}</span></span> <button onClick={() => onOpenModalCart()} >Перейти</button>
    </div>
  );
}

CartControls.propTypes = {
  onOpenModalCart: PropTypes.func,
  amountCart: PropTypes.number,
  totalCartPrice: PropTypes.number
};

CartControls.defaultProps = {
  onOpenModalCart: () => {},
  amountCart: 0
}

export default React.memo(CartControls);
