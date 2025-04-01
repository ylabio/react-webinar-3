import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, price_format } from '../../utils';
import cartIcon from './cart-icon.svg';

function Controls({ totalPrice = 0, uniqueCount = 0, onOpenCart = () => {} }) {

  return (
    <div className="Controls">
      <button className="Cart-open" onClick={() => onOpenCart()}>
        <img src={cartIcon} alt="cart" />

        {uniqueCount
            ?
              `${uniqueCount} ${plural(uniqueCount, {
                one: 'товар', 
                few: 'товара',
                many: 'товаров'
              })} / ${price_format(totalPrice)}`
            :
              'Пусто'
        }
      </button>  
    </div>
  );
};

Controls.propTypes = {
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
  uniqueCount: PropTypes.number,
  onOpenCart: PropTypes.func,
};

export default React.memo(Controls);