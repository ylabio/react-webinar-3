import React from "react";
import PropTypes from 'prop-types';
import {formatPrice, plural} from "../../utils";
import './style.css';

function CartInfo({cart}) {
  return (
    <div className='CartInfo'>
      <div>
        В корзине:
      </div>
      <div className='CartInfo-data'>
        {cart.cartList.length ? `${cart.cartList.length} ${plural(cart.cartList.length, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${formatPrice(cart.cartTotalPrice)} ₽` : 'пусто'}
      </div>
    </div>
  )
}

CartInfo.propTypes = {
  cart: PropTypes.shape({
    cartList: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
    })),
    cartTotalPrice: PropTypes.number,
  }),
};

CartInfo.defaultProps = {
  cart: {
    cartList: [],
    cartItemsCount: 0,
    cartTotalPrice: 0
  },
};

export default React.memo(CartInfo);
