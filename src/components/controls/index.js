import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({ setIsVisible, cartQuantity, cartTotalPrice }) {
  
  const variants = { one: 'товар', few: 'товара', many: 'товаров' };
  
  return (
    <div className='Controls'>     
      <div className='Controls-cart'>
        В корзине: <span>{cartQuantity ? `${cartQuantity} ${plural(cartQuantity, variants)} / ${cartTotalPrice} ₽` : 'пусто'}</span>
      </div>
      <button onClick={() => setIsVisible(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  setIsVisible: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number.isRequired,
  cartTotalPrice: PropTypes.string.isRequired
};

export default React.memo(Controls);
