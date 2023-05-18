import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";
import Price from "../price";

function Controls({goToCart, itemCount, totalPrice}){
  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <span className="Controls-cart">
        {
          itemCount > 0 
          ? <span>
              {`${itemCount} ${plural(itemCount, {one: 'товар', few: 'товара', many: 'товаров'})} / `}
              <Price price={totalPrice} />
            </span>
          : <span>пусто</span>
        }
      </span>
      <button onClick={() => goToCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  goToCart: PropTypes.func
};

Controls.defaultProps = {
  goToCart: () => {}
}

export default React.memo(Controls);
