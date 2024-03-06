import React from "react";
import PropTypes from 'prop-types';
import {formatPrice, plural} from "../../utils";
import './style.css';

function CartInfo({cartItemsCount, cartTotalPrice}) {
  return (
    <div className='CartInfo'>
      <div>
        В корзине:
      </div>
      <div className='CartInfo-data'>
        {cartItemsCount ? `${cartItemsCount} ${plural(cartItemsCount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${formatPrice(cartTotalPrice)} ₽` : 'пусто'}
      </div>
    </div>
  )
}

CartInfo.propTypes = {
  cartTotalPrice: PropTypes.number,
  cartItemsCount: PropTypes.number,
};

CartInfo.defaultProps = {
  cartTotalPrice: 0,
  cartItemsCount: 0,
};

export default React.memo(CartInfo);
