import React from "react";
import PropTypes from "prop-types";
import { getRubPriceInt, plural } from "../../utils";
import './style.css';

function CartInfo({totalQuantity, totalPrice}) {
  return (
    <div className='Cart-info'>
      В корзине:
      <p className='Cart-info__text'>
        {
          totalQuantity ?
          ` ${totalQuantity} ${plural(totalQuantity,
        {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${getRubPriceInt(totalPrice)}` : 'пусто'}</p>
    </div>
  )
}

CartInfo.propTypes = {
  totalQuantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default React.memo(CartInfo);
