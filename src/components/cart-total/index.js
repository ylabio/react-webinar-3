import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import { getFormattedPrice } from "../../utils";

function CartTotal({totalPrice, products}) {
  const totalText = products.length > 0 ?
    (<><span className="Cart-result">Итого</span><span>{getFormattedPrice(totalPrice)}</span></>) :
    'Корзина пуста';
    
  return (
    <div className="Cart-total">
      <b>{totalText}</b>
    </div>
  );
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    amount: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
};

export default React.memo(CartTotal);
