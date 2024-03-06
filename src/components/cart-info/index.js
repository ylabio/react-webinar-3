import React from "react";
import PropTypes from "prop-types";
import { getRubPriceInt, plural } from "../../utils";
import './style.css';

function CartInfo({ cartTotal }) {
  const {totalQuantity, totalPrice} = cartTotal
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
  cartTotal: PropTypes.shape({
    totalQuantity: PropTypes.number,
    totalPrice: PropTypes.number
  }).isRequired
};

export default React.memo(CartInfo);
