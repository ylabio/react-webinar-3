import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls({cart, onOpenPopup}){
	let uniqAmount = cart.cartList.length;
  return (
    <div className='Controls'>
      <div>В корзине:</div>
      <div className="Controls-cart">
        {
          uniqAmount 
          ? <div>
              {`${uniqAmount} ${plural(uniqAmount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${cart.totalPrice.toLocaleString()}  ₽`}
            </div>
          : <div>пусто</div>
        }
      </div>
      <button onClick={() => onOpenPopup()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
	onOpenPopup: PropTypes.func
};

Controls.defaultProps = {
	onOpenPopup: () => {}
}

export default React.memo(Controls);
