import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function CartInfo({cartInfo}) {
  return (
    <div className='CartInfo'>
      <div>
        В корзине:
      </div>
      <div className='CartInfo-data'>
        {cartInfo.count ? `${cartInfo.count} ${plural(cartInfo.count, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${cartInfo.totalPrice} ₽` : 'пусто'}
      </div>
    </div>
  )
}

CartInfo.propTypes = {
  cartInfo: PropTypes.shape({
    count: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};

CartInfo.defaultProps = {
  cartInfo: {}
}

export default React.memo(CartInfo);
