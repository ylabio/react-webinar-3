import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import "./style.css";

function Controls({onOpenCart, cartItemsAmount, cartItemsPrice}) {
  return (
    <div className='Controls'>
      <div className='Controls-cart-amount'>
        {cartItemsAmount >= 0 && (
          <>
            <p>В корзине:</p>
            <p>
              {cartItemsAmount > 0
                ? `${cartItemsAmount} ${plural(cartItemsAmount, {
                    one: "товар",
                    few: "товара",
                    many: "товаров",
                  })} / ${cartItemsPrice.toLocaleString("ru")} ₽`
                : "пусто"}
            </p>
          </>
        )}
      </div>
      <button onClick={() => onOpenCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  cartItemsAmount: PropTypes.number,
  cartItemsPrice: PropTypes.number,
  onOpenCart: PropTypes.func,
};

Controls.defaultProps = {
  onOpenCart: () => {},
};

export default React.memo(Controls);
