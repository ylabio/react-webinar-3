import React from "react";
import PropTypes from 'prop-types';
import { plural, numberFormat } from "../../utils";
import "./style.css";

function Controls({cart, totalCart, openWindow}){
  return (
    <div className='Controls'>
      <div className="Details">
        <span className="Cart-title">В корзине:</span>
        <b>{!!cart.length
                ? `${cart.length} ${plural(cart.length, {
                    one: "товар",
                    few: "товара",
                    many: "товаров",
                  })} / ${numberFormat(totalCart)}`
                : "пусто"}
        </b>
      </div>
      <button onClick={openWindow}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
