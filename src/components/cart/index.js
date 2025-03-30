import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getFullAmount, getTypeOfNumber, plural } from "../../utils";
import CartIcon from '../../accets/cart.svg';

function Cart({ cart, setVisible = () => {}, amountOfProducts = 0,fullAmount=0 }) {
 
  return (
    <div className="Card">
      <div className="Card-content">
       <button onClick={() => setVisible(true)}>
       <img src={CartIcon} alt="My Cart" />
        {cart.length !== 0 ? (
          <span>
            {amountOfProducts}{" "}
            {`${plural(amountOfProducts, {
              one: "товар",
              few: "товарa",
              many: "товаров",
            })} `}
           {" "} / {" "}{getTypeOfNumber(fullAmount)} ₽
          </span>
        ) : (
          <span>Пусто</span>
        )}
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default React.memo(Cart);
