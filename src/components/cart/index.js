import React from "react";
import PropTypes, { number } from 'prop-types';
import List from "../list";
import {numberFormat} from "../../utils";
import "./style.css";

function Cart({cart, totalCart, action}) {
  return (
      <>
        {!!cart.length ? (
          <div className="Cart__body">
            <List list={cart} buttonText="Удалить" action={action} />
            <div className="Cart-bottom">
              <div className="Cart-price">Итого</div>
              <div className="Cart-summ">{numberFormat(totalCart)}</div>
            </div>
          </div>
        ) : (
          <div className="Cart__body">
            <h1 className="Cart__body-title">В корзине пусто!</h1>
          </div>
        )}
      </>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  totalCart: PropTypes.number,
  action: PropTypes.func,
}

export default Cart;