import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({goToCart, itemCount, totalPrice}){
  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <span className="Controls-cart">
        {itemCount > 0 ? `${itemCount} ${plural(itemCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalPrice} ₽` : 'пусто'}
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
