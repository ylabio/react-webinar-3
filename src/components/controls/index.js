import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../cart-icon';
import { plural, formatNumber } from '../../utils';

function Controls({ cartTotal = 0, cartSum = 0, onOpenCart }) {
  return (
    <div className="Controls">
      <button onClick={onOpenCart} className='Controls-cart'>
        <CartIcon/>
        {cartTotal > 0 
          ? `${cartTotal} ${plural(cartTotal, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatNumber(cartSum)} ₽`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {  
    cartTotal: PropTypes.number.isRequired,
    cartSum: PropTypes.number.isRequired,
    onOpenCart: PropTypes.func.isRequired,
};

export default React.memo(Controls);
