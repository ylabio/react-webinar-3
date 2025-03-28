import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, price_format } from '../../utils';
import cartIcon from './cart-icon.svg';

function Controls({ list = [], onOpenCart = () => {} }) {
  let totalCount = 0;
  let totalPrice = 0;

  return (
    <div className="Controls">
      <button className="Cart-open" onClick={() => onOpenCart()}>
        <img src={cartIcon} alt="cart" />
        {list.map(item => {
          if (item.isCart) {
            totalCount = totalCount + 1;
            totalPrice = totalPrice + item.price * item.count;
          }
        })}
        {totalCount
            ?
              `${totalCount} ${plural(totalCount, {
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
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      isCart: PropTypes.bool,
      count: PropTypes.number,
    })
  ),
  onOpenCart: PropTypes.func,
};

export default React.memo(Controls);
